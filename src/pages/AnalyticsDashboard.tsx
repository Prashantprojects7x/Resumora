import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { subscribeToResumeAnalytics } from '@/lib/resumeService';
import { BarChart3, Eye, Globe, Clock, ArrowLeft, Loader2, Monitor, Smartphone, LayoutDashboard, Copy, CheckCircle2, CopyIcon, ChevronRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { format, subDays, startOfDay, parseISO } from 'date-fns';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { Button } from '@/components/ui/Button';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

export function AnalyticsDashboard() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<{ views: number, recentViews: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug || !user) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = subscribeToResumeAnalytics(
      slug,
      (data) => {
        setAnalytics(data);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching analytics:', err);
        setError(err.message || 'Failed to load analytics');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [slug, user]);

  const copyLink = () => {
    const url = `${window.location.host}/p/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartData = useMemo(() => {
    if (!analytics?.recentViews) return [];
    
    // Generate last 7 days data
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = subDays(new Date(), 6 - i);
      return {
        date: startOfDay(d).getTime(),
        displayDate: format(d, 'MMM dd'),
        views: 0
      };
    });

    analytics.recentViews.forEach(view => {
      const viewDate = startOfDay(new Date(view.viewedAt)).getTime();
      const dayData = last7Days.find(d => d.date === viewDate);
      if (dayData) {
        dayData.views += 1;
      }
    });

    return last7Days;
  }, [analytics]);

  const deviceData = useMemo(() => {
    if (!analytics?.recentViews) return [];
    let desktop = 0;
    let mobile = 0;
    
    analytics.recentViews.forEach(view => {
      const isMobile = view.userAgent.toLowerCase().includes('mobile');
      if (isMobile) mobile++;
      else desktop++;
    });

    return [
      { name: 'Desktop', value: desktop, icon: Monitor },
      { name: 'Mobile', value: mobile, icon: Smartphone }
    ].filter(d => d.value > 0);
  }, [analytics]);

  const locationData = useMemo(() => {
    if (!analytics?.recentViews) return [];
    const counts: Record<string, number> = {};
    
    analytics.recentViews.forEach(view => {
      const loc = view.location && view.location !== 'Unknown' && view.location !== 'Unknown Location' && view.location !== 'Web Visitor' 
        ? view.location 
        : 'Unknown';
      counts[loc] = (counts[loc] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [analytics]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-4">
        <Logo />
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Sign In Required</h1>
          <p className="text-zinc-600 mb-6">You need to be signed in to view analytics.</p>
          <Link to="/" className="text-indigo-600 hover:underline font-medium">Return Home</Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-4">
        <Logo />
        <div className="mt-8 text-center bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Analytics Not Found</h1>
          <p className="text-zinc-600 mb-6">{error || "We couldn't find analytics for this resume."}</p>
          <Link to="/" className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 font-semibold transition-colors">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const topLocation = locationData.length > 0 ? locationData[0].name : 'N/A';

  // Calculate Avg Time Spent
  const viewsWithTime = analytics.recentViews.filter(v => v.timeSpent && v.timeSpent > 0);
  let avgTimeStr = '0s';
  if (viewsWithTime.length > 0) {
    const totalTime = viewsWithTime.reduce((sum, v) => sum + v.timeSpent, 0);
    const avgSeconds = Math.round(totalTime / viewsWithTime.length);
    if (avgSeconds < 60) {
      avgTimeStr = `${avgSeconds}s`;
    } else {
      const mins = Math.floor(avgSeconds / 60);
      const secs = avgSeconds % 60;
      avgTimeStr = `${mins}m ${secs}s`;
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />
            <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 font-medium">
              <ChevronRight className="w-4 h-4" />
              <span>Analytics</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-zinc-900 truncate max-w-[200px]">{slug}</span>
            </div>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-8 h-8 text-indigo-600" />
              Performance Overview
            </h1>
            <p className="text-zinc-500 font-medium">Real-time insights for your published resume</p>
          </div>
          
          <div className="flex items-center bg-white border border-zinc-200 p-1.5 rounded-full shadow-sm hover:shadow transition-shadow">
            <div className="px-3 py-1 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-zinc-600 truncate max-w-[150px] sm:max-w-xs">{window.location.host}/p/{slug}</span>
            </div>
            <Button 
               variant="ghost"
               onClick={copyLink}
               className="h-8 rounded-full px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium text-xs"
            >
              {copied ? <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="w-3.5 h-3.5"/> Copied</span> : <span className="flex items-center gap-1"><CopyIcon className="w-3.5 h-3.5"/> Copy</span>}
            </Button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                Live
              </span>
            </div>
            <p className="text-zinc-500 font-medium text-sm mb-1">Total Lifetime Views</p>
            <h3 className="text-4xl font-extrabold text-zinc-900 tracking-tight">{analytics.views}</h3>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-shadow">
             <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-zinc-500 font-medium text-sm mb-1">Top Location</p>
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight truncate" title={topLocation}>{topLocation}</h3>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-zinc-500 font-medium text-sm mb-1">Avg. Time Spent</p>
            <h3 className="text-3xl font-bold text-zinc-900 tracking-tight">{avgTimeStr}</h3>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] lg:col-span-2 flex flex-col h-[400px]">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Views Over Time (Last 7 Days)</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                  <XAxis dataKey="displayDate" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ stroke: '#a1a1aa', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area type="monotone" dataKey="views" name="Views" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" activeDot={{r: 6, strokeWidth: 0, fill: '#4f46e5'}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col h-[400px]">
             <h3 className="text-lg font-bold text-zinc-900 mb-6">Device Distribution</h3>
             <div className="flex-1 w-full flex items-center justify-center">
              {deviceData.length > 0 ? (
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} Views`, '']}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      formatter={(value, entry, index) => {
                        const data = deviceData[index];
                        return <span className="text-zinc-700 font-medium ml-1">{value} ({data.value})</span>;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-zinc-400 flex flex-col items-center">
                  <Monitor className="w-10 h-10 mb-2 opacity-50" />
                  <p>Not enough data</p>
                </div>
              )}
             </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] lg:col-span-1 flex flex-col max-h-[400px] overflow-hidden">
             <h3 className="text-lg font-bold text-zinc-900 mb-6">Top Locations</h3>
             <div className="flex-1 w-full flex flex-col overflow-y-auto pr-2 custom-scrollbar">
                {locationData.length > 0 ? (
                  <div className="space-y-4">
                    {locationData.map((loc, idx) => {
                      const maxLoc = locationData[0].value;
                      const pct = Math.max(5, Math.round((loc.value / maxLoc) * 100));
                      return (
                        <div key={idx} className="relative">
                          <div className="flex justify-between text-sm mb-1.5 z-10 relative px-1">
                            <span className="font-medium text-zinc-800">{loc.name}</span>
                            <span className="text-zinc-500 font-bold">{loc.value}</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 rounded-full" 
                              style={{ width: `${pct}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="m-auto text-zinc-400 text-center">No location data available.</div>
                )}
             </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] lg:col-span-2 flex flex-col max-h-[400px]">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Recent Visitors Feed</h3>
              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">Live updates</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-0 m-0">
              {analytics.recentViews.length > 0 ? (
                <ul className="divide-y divide-zinc-100">
                  {analytics.recentViews.map((view, i) => {
                    const isMobile = view.userAgent.toLowerCase().includes('mobile');
                    const browser = view.userAgent.includes('Chrome') ? 'Chrome' : 
                                    view.userAgent.includes('Safari') ? 'Safari' : 
                                    view.userAgent.includes('Firefox') ? 'Firefox' : 'Other';
                    
                    let timeStr = '0s';
                    if (view.timeSpent) {
                      if (view.timeSpent < 60) timeStr = `${view.timeSpent}s`;
                      else timeStr = `${Math.floor(view.timeSpent / 60)}m ${view.timeSpent % 60}s`;
                    }
                    
                    return (
                      <li key={view.id || i} className="p-4 sm:px-6 hover:bg-zinc-50/80 transition-colors flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-center justify-center p-2 bg-zinc-100 rounded-xl w-12 h-12 text-zinc-500 shrink-0">
                          {isMobile ? <Smartphone className="w-5 h-5"/> : <Monitor className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-bold text-zinc-900 truncate pr-4">
                              {view.location !== 'Unknown' ? view.location : 'Anonymous Visitor'}
                            </h4>
                            <span className="text-xs text-zinc-500 whitespace-nowrap">
                               {format(view.viewedAt, 'MMM d, h:mm a')}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-zinc-500">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {timeStr} spent
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                            <span className="truncate">{browser} on {isMobile ? 'Mobile' : 'Desktop'}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="h-full flex items-center justify-center text-zinc-400 py-12">
                   No recent views
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


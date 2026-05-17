const fs = require('fs');
const path = require('path');

const dir = 'src/components/preview/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Import Github, Linkedin, Globe
  if (!content.includes('Github')) {
    content = content.replace(/import \{([^}]+)\} from 'lucide-react';/, (match, p1) => {
      let imports = p1.split(',').map(i => i.trim());
      ['Github', 'Linkedin', 'Globe'].forEach(icon => {
        if (!imports.includes(icon)) imports.push(icon);
      });
      return `import { ${imports.join(', ')} } from 'lucide-react';`;
    });
  }

  // Find the block where personalInfo.city is rendered to figure out the style
  const cityRegex = /(\{\(personalInfo\.city \|\| personalInfo\.country\) && \([\s\S]*?<\/[a-z]+>\s*\)\s*\})/;
  
  if (cityRegex.test(content)) {
    const cityBlock = content.match(cityRegex)[1];
    
    // Check style of the block to mimic it
    let linkedinBlock = '';
    let githubBlock = '';
    let portfolioBlock = '';

    if (cityBlock.includes('<MapPin')) {
      // It has icons! Let's extract the class name of the MapPin
      const iconMatch = cityBlock.match(/<MapPin ([^>]+)>/);
      const iconProps = iconMatch ? iconMatch[1] : 'className="w-4 h-4"';
      
      const spanMatch = cityBlock.match(/<span ([^>]+)>/);
      const spanProps = spanMatch ? spanMatch[1] : 'className="flex items-center gap-2"';

      linkedinBlock = `
            {personalInfo.linkedin && (
              <span ${spanProps}><Linkedin ${iconProps} /> {personalInfo.linkedin.replace(/^https?:\\/\\//, '')}</span>
            )}`;
      githubBlock = `
            {personalInfo.github && (
              <span ${spanProps}><Github ${iconProps} /> {personalInfo.github.replace(/^https?:\\/\\//, '')}</span>
            )}`;
      portfolioBlock = `
            {personalInfo.portfolio && (
              <span ${spanProps}><Globe ${iconProps} /> {personalInfo.portfolio.replace(/^https?:\\/\\//, '')}</span>
            )}`;
    } else {
      // It's text-only. Look at how phone is rendered to see if it uses dots
      if (content.includes('<span>•</span>') || content.includes('• {personalInfo.phone}')) {
         if (content.includes('<span>•</span>') || content.includes('className="text-zinc-400">•</span>')) {
            // Academic and Corporate style
            const bullet = content.includes('className="text-zinc-400">•</span>') 
              ? '<span className="text-zinc-400">•</span>' 
              : '<span>•</span>';
            linkedinBlock = `
            {personalInfo.linkedin && ${bullet}}
            {personalInfo.linkedin && <span>{personalInfo.linkedin.replace(/^https?:\\/\\//, '')}</span>}`;
            githubBlock = `
            {personalInfo.github && ${bullet}}
            {personalInfo.github && <span>{personalInfo.github.replace(/^https?:\\/\\//, '')}</span>}`;
            portfolioBlock = `
            {personalInfo.portfolio && ${bullet}}
            {personalInfo.portfolio && <span>{personalInfo.portfolio.replace(/^https?:\\/\\//, '')}</span>}`;
         } else {
            // Minimal style: • {personalInfo.city}
            linkedinBlock = `
            {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\\/\\//, '')}</span>}`;
            githubBlock = `
            {personalInfo.github && <span>• {personalInfo.github.replace(/^https?:\\/\\//, '')}</span>}`;
            portfolioBlock = `
            {personalInfo.portfolio && <span>• {personalInfo.portfolio.replace(/^https?:\\/\\//, '')}</span>}`;
         }
      } else {
        // Just spans
        const spanMatch = cityBlock.match(/<span([^>]*)>/);
        const spanAttr = spanMatch ? spanMatch[1] : '';
        
        linkedinBlock = `
            {personalInfo.linkedin && <span${spanAttr}>{personalInfo.linkedin.replace(/^https?:\\/\\//, '')}</span>}`;
        githubBlock = `
            {personalInfo.github && <span${spanAttr}>{personalInfo.github.replace(/^https?:\\/\\//, '')}</span>}`;
        portfolioBlock = `
            {personalInfo.portfolio && <span${spanAttr}>{personalInfo.portfolio.replace(/^https?:\\/\\//, '')}</span>}`;
      }
    }

    // Insert after city block
    if (!content.includes('personalInfo.linkedin') && file !== 'CreativeTemplate.tsx') {
      content = content.replace(cityBlock, cityBlock + linkedinBlock + githubBlock + portfolioBlock);
    }
  }

  // Creative template might be different. Let's check if it doesn't match and handle specially.
  if (file === 'CreativeTemplate.tsx') {
    // Creative template has a vertical list for Contacts
    if (!content.includes('personalInfo.linkedin')) {
      const phoneRegex = /(\{personalInfo\.phone && \(\s*<div className="flex items-center gap-3">\s*<Phone className="w-4 h-4 shrink-0 text-white\/70" \/>\s*<span>\{personalInfo\.phone\}<\/span>\s*<\/div>\s*\)\})/;
      content = content.replace(phoneRegex, `$1
              {personalInfo.linkedin && (
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 shrink-0 text-white/70" />
                  <span>{personalInfo.linkedin.replace(/^https?:\\/\\//, '')}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 shrink-0 text-white/70" />
                  <span>{personalInfo.github.replace(/^https?:\\/\\//, '')}</span>
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 shrink-0 text-white/70" />
                  <span>{personalInfo.portfolio.replace(/^https?:\\/\\//, '')}</span>
                </div>
              )}`);
    }
  }

  // Also need to add lucide-react import if not using it?
  // Academic, Corporate, Minimal, Elegant don't import ANY lucide icons currently!
  // Wait, my regex `import \\{([^}]+)\\} from 'lucide-react';` will fail if lucide-react isn't imported at all.
  if (!content.includes('lucide-react')) {
    content = `import { Github, Linkedin, Globe } from 'lucide-react';\n` + content;
  }

  fs.writeFileSync(filePath, content);
}
console.log('Script completed');

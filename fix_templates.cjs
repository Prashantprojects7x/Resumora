const fs = require('fs');
const path = require('path');

const dir = 'src/components/preview/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove import
  content = content.replace(/import { useResumeStore } from '@\/store\/useResumeStore';\n?/g, '');

  // Regex for replacement
  const regex = /export function (\w+)\(\{ data: propData \}: \{ data\?: ResumeData \}\) \{\n\s*const storeData = useResumeStore\(state => state\.data\);\n\s*const data = propData \|\| storeData;/g;
  
  content = content.replace(regex, 'export function $1({ data }: { data: ResumeData }) {');

  fs.writeFileSync(filePath, content);
}
console.log('Done modifying templates');

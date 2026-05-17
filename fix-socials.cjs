const fs = require('fs');
const path = require('path');

const dir = 'src/components/preview/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/ \/ \/>/g, ' />');

  fs.writeFileSync(filePath, content);
}
console.log('Fixed syntax error');

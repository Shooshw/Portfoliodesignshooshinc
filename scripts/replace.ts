import fs from 'fs';
import path from 'path';

function walk(dir: string, callback: (file: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', (file) => {
  if (file.endsWith('.ts') || file.endsWith('.tsx')) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('"/src/assets/images/')) {
      fs.writeFileSync(file, content.replaceAll('"/src/assets/images/', '"/Portfoliodesignshooshinc/src/assets/images/'));
      console.log('Updated', file);
    }
  }
});

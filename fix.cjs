const fs = require('fs');
const path = require('path');

const imagesDir = path.join(process.cwd(), 'public', 'images');
const images = fs.readdirSync(imagesDir).filter(f => !fs.statSync(path.join(imagesDir, f)).isDirectory());

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let content = fs.readFileSync(p, 'utf8');
      let modified = false;

      // Remove the remaining relative import
      const importToRemove = "import chogathVideo from \"../../assets/cho'gath_cavalheiro.mp4\";\n";
      if (content.includes(importToRemove)) {
        content = content.replace(importToRemove, "");
        modified = true;
      }

      // Replace src="/image.png" with src="/images/image.png"
      images.forEach(img => {
        const safeImg = img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`src="/${safeImg}"`, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, `src="/images/${img}"`);
          modified = true;
        }
      });

      if (modified) {
        fs.writeFileSync(p, content, 'utf8');
        console.log(`Updated ${p}`);
      }
    }
  });
}

walk(path.join(process.cwd(), 'src'));

const fs = require('fs');
const path = require('path');

const renames = {
  // Video renames
  "1668457441-1668457441-neeko-the-curious-chameleon-live-wallpaper.mp4": "neeko-live-wallpaper.mp4",
  "blitzcrank_goleiro.mp4": "blitzcrank-goleiro.mp4",
  "cho'gath_cavalheiro.mp4": "chogath-cavalheiro.mp4",
  "list-9-16.mp4": "aquora-video.mp4",
  "zed_galante.mp4": "zed-galante.mp4",

  // Lol Screens
  "lol_screen_1.png": "lol-screen-1.png",
  "lol_screen_3.png": "lol-screen-3.png",
  "lol_screen_4.png": "lol-screen-4.png",

  // Lol Project images
  "regenerated_image_1778333772812.png": "lol-logo.png",
  "regenerated_image_1778438287182.jpg": "lol-prob-1.jpg",
  "regenerated_image_1778438069903.png": "lol-prob-2.png",
  "regenerated_image_1778438863377.png": "lol-res-1.png",
  "regenerated_image_1778439392302.png": "lol-res-2.png",
  "regenerated_image_1778440331949.png": "lol-proto-1.png",
  "regenerated_image_1778440003813.png": "lol-proto-2.png",
  "regenerated_image_1778441031638.png": "lol-proto-3.png",
  "regenerated_image_1778440822469.png": "lol-proto-4.png",
  "regenerated_image_1778441202811.png": "lol-final-1.png",
  "regenerated_image_1778441201032.png": "lol-final-2.png",

  // Aquora Project images
  "captura-de-tela-2026-05-11-001637.png": "aquora-various-apps.png",
  "captura-de-tela-2026-05-11-001645.png": "aquora-office-rec.png",
  "captura-de-tela-2026-05-11-002534.png": "aquora-support-mat.png",
  "regenerated_image_1778466713759.png": "aquora-logo.png",
  "regenerated_image_1778442010151.png": "aquora-home-login.png",
  "regenerated_image_1778442012973.png": "aquora-sleep-config.png",
  "regenerated_image_1778442015485.png": "aquora-routine-mon.png",
  "regenerated_image_1778442017180.png": "aquora-emergency.png",

  // Other projects
  "regenerated_image_1778211000396.jpg": "mirror-ado-project.jpg",
  "regenerated_image_1778211137770.jpg": "zumbis-project.jpg",
  "regenerated_image_1778211222262.png": "zumbis-project-2.png",
  "regenerated_image_1778211232196.png": "zumbis-project-3.png",
  "regenerated_image_1778211615718.jpg": "chapeuzinho-project.jpg",
  "regenerated_image_1778212354434.png": "chapeuzinho-project-2.png",
  "regenerated_image_1778212356032.jpg": "chapeuzinho-project-3.jpg",
  "regenerated_image_1778213078006.png": "chapeuzinho-project-4.png",
  "regenerated_image_1778213157796.jpg": "chapeuzinho-project-5.jpg",
  "regenerated_image_1778214429836.jpg": "indiesynth-detail.jpg"
};

const imagesDir = path.join(process.cwd(), 'public', 'images');

// Rename files
for (const [oldName, newName] of Object.entries(renames)) {
  const oldPath = path.join(imagesDir, oldName);
  const newPath = path.join(imagesDir, newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${oldName} to ${newName}`);
  }
}

// Update files
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const exts = ['.tsx', '.ts', '.html', '.css'];
walkDir(path.join(process.cwd(), 'src'), (filePath) => {
  if (exts.includes(path.extname(filePath))) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    for (const [oldName, newName] of Object.entries(renames)) {
      // Create a global search replacing the old filename with the new one
      // Escape special characters in oldName (like quotes or dots)
      const safeOldName = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // For images, they might have /images/ prefix
      const regex = new RegExp(`(/images)?/?${safeOldName}`, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, `$1/${newName}`);
        // Fix up URLs that might become like /images//newName
        content = content.replace(new RegExp(`(/images)?//+${newName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'), `/images/${newName}`);
        modified = true;
      }
    }
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});

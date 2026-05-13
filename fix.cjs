const fs = require('fs');

const files = [
  'src/app/components/aquora-project.tsx',
  'src/app/components/lol-project.tsx',
  'src/app/components/projects-main.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace variable assignments with strings
  content = content
    // aquora-project
    .replace(/src=\{aquoraLogo\}/g, 'src=\"/images/regenerated_image_1778466713759.png\"')
    .replace(/src=\{homeLoginImage\}/g, 'src=\"/images/regenerated_image_1778442010151.png\"')
    .replace(/src=\{sleepConfigImage\}/g, 'src=\"/images/regenerated_image_1778442012973.png\"')
    .replace(/src=\{routineMonImage\}/g, 'src=\"/images/regenerated_image_1778442015485.png\"')
    .replace(/src=\{emergencyImage\}/g, 'src=\"/images/regenerated_image_1778442017180.png\"')
    .replace(/src=\{designSystemImage\}/g, 'src=\"/images/design-system.png\"')
    .replace(/src=\{variousAppsImage\}/g, 'src=\"/images/captura-de-tela-2026-05-11-001637.png\"')
    .replace(/src=\{supportMatImage\}/g, 'src=\"/images/captura-de-tela-2026-05-11-002534.png\"')
    .replace(/src=\{officeRecImage\}/g, 'src=\"/images/captura-de-tela-2026-05-11-001645.png\"')
    // lol-project
    .replace(/src=\{neekoVideo\}/g, 'src=\"/images/1668457441-1668457441-neeko-the-curious-chameleon-live-wallpaper.mp4\"')
    .replace(/src=\{lolLogo\}/g, 'src=\"/images/regenerated_image_1778333772812.png\"')
    .replace(/src=\{lolProb1\}/g, 'src=\"/images/regenerated_image_1778438287182.jpg\"')
    .replace(/src=\{lolProb2\}/g, 'src=\"/images/regenerated_image_1778438069903.png\"')
    .replace(/src=\{lolRes1\}/g, 'src=\"/images/regenerated_image_1778438863377.png\"')
    .replace(/src=\{lolRes2\}/g, 'src=\"/images/regenerated_image_1778439392302.png\"')
    .replace(/src=\{lolProto1\}/g, 'src=\"/images/regenerated_image_1778440331949.png\"')
    .replace(/src=\{lolProto2\}/g, 'src=\"/images/regenerated_image_1778440003813.png\"')
    .replace(/src=\{lolProto3\}/g, 'src=\"/images/regenerated_image_1778441031638.png\"')
    .replace(/src=\{lolProto4\}/g, 'src=\"/images/regenerated_image_1778440822469.png\"')
    .replace(/src=\{lolFinal1\}/g, 'src=\"/images/regenerated_image_1778441202811.png\"')
    .replace(/src=\{lolFinal2\}/g, 'src=\"/images/regenerated_image_1778441201032.png\"')
    .replace(/src=\{lolScreen1\}/g, 'src=\"/images/lol_screen_1.png\"')
    .replace(/src=\{lolScreen2\}/g, 'src=\"/images/lol-screen-2.png\"')
    .replace(/src=\{lolScreen3\}/g, 'src=\"/images/lol_screen_3.png\"')
    .replace(/src=\{lolScreen4\}/g, 'src=\"/images/lol_screen_4.png\"')
    .replace(/src=\{blitzcrankVideo\}/g, 'src=\"/images/blitzcrank_goleiro.mp4\"')
    .replace(/src=\{chogathVideo\}/g, "src=\"/images/cho'gath_cavalheiro.mp4\"")
    .replace(/src=\{zedVideo\}/g, 'src=\"/images/zed_galante.mp4\"')
    // projects-main
    .replace(/src=\{aquoraVideo\}/g, 'src=\"/images/list-9-16.mp4\"')
    .replace(/src=\{lolVideo\}/g, 'src=\"/images/1668457441-1668457441-neeko-the-curious-chameleon-live-wallpaper.mp4\"');
    
  // Strip lines like import foo from '../../assets/images/...'
  content = content.replace(/import\s+[a-zA-Z0-9_]+\s+from\s+[\"']\.\.\/\.\.\/assets\/images\/[^\"']+[\"'];\n?/g, '');
  
  fs.writeFileSync(file, content);
});

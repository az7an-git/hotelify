const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  // Form Inputs
  {
    regex: /bg-slate-950 text-slate-100 border border-slate-800/g,
    replacement: "bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100"
  },
  {
    regex: /bg-slate-950 text-slate-200 border border-slate-800/g,
    replacement: "bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100"
  },
  // Dark text inside dark mode elements
  {
    regex: /text-zinc-900 dark:text-slate-800/g,
    replacement: "text-slate-800"
  },
  {
    regex: /text-zinc-600 dark:text-zinc-400/g,
    replacement: "text-slate-600"
  },
  // Specific backgrounds
  {
    regex: /bg-slate-950 text-slate-100 border-t border-slate-900/g,
    replacement: "glass-panel my-12 mx-4 rounded-3xl text-slate-800 border-t border-white/50"
  },
  {
    regex: /bg-slate-950/g,
    replacement: "bg-white/40 backdrop-blur-md border border-white/50"
  },
  {
    regex: /border-slate-800/g,
    replacement: "border-white/60"
  },
  {
    regex: /text-slate-200/g,
    replacement: "text-slate-700"
  },
  {
    regex: /text-slate-100/g,
    replacement: "text-slate-800"
  },
  {
    regex: /text-slate-500/g,
    replacement: "text-slate-600 font-medium"
  }
];

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      replacements.forEach(r => {
        if (r.regex.test(content)) {
          content = content.replace(r.regex, r.replacement);
          changed = true;
        }
      });
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

walkDir(directoryPath);

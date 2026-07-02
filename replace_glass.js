const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  // Global sections in Home page
  {
    regex: /bg-slate-900 text-slate-100 max-lg:mt-5 border-t border-slate-800\/60/g,
    replacement: "glass-panel max-lg:mt-5 my-12 rounded-3xl mx-4 text-slate-800"
  },
  {
    regex: /bg-slate-900 text-slate-100 border-t border-slate-900/g,
    replacement: "glass-panel rounded-3xl mx-4 my-12 text-slate-800"
  },
  // Card elements
  {
    regex: /bg-slate-900\/50 border border-slate-800\/80 rounded-2xl hover:bg-slate-800\/50/g,
    replacement: "glass-card hover:bg-white/60 text-slate-800"
  },
  {
    regex: /bg-slate-900 border border-slate-800\/80 shadow-xl hover:shadow-slate-950\/50 hover:border-slate-700\/60/g,
    replacement: "glass-card"
  },
  {
    regex: /bg-slate-900 border border-slate-800\/80 rounded-2xl shadow-xl/g,
    replacement: "glass-card"
  },
  {
    regex: /bg-slate-900 border border-slate-800\/80 p-6 md:p-8 rounded-2xl shadow-xl/g,
    replacement: "glass-card p-6 md:p-8"
  },
  // Footer
  {
    regex: /bg-slate-900 border-t border-slate-800\/80 text-slate-400/g,
    replacement: "glass-panel border-t border-slate-100 text-slate-600"
  },
  // Tabs and toggles
  {
    regex: /bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/g,
    replacement: "bg-white/40 text-slate-600 hover:text-blue-600 hover:bg-white/60 border border-white/50 shadow-sm rounded-xl backdrop-blur-md transition-all"
  },
  // RoomCard specific
  {
    regex: /border border-slate-800\/80 rounded-2xl shadow-xl hover:shadow-slate-950\/50 hover:border-slate-700\/60 transform transition-all duration-300 hover:-translate-y-1 bg-slate-900 max-w-sm mx-auto p-4/g,
    replacement: "glass-card max-w-sm mx-auto p-4"
  },
  // Generic text replacements
  {
    regex: /text-slate-300/g,
    replacement: "text-slate-600"
  },
  {
    regex: /text-slate-400/g,
    replacement: "text-slate-500"
  },
  {
    regex: /text-white/g,
    replacement: "text-slate-800"
  },
  {
    regex: /text-teal-400/g,
    replacement: "text-blue-600"
  },
  {
    regex: /bg-teal-400/g,
    replacement: "bg-blue-500"
  },
  {
    regex: /hover:bg-teal-350/g,
    replacement: "hover:bg-blue-600"
  },
  {
    regex: /text-teal-500/g,
    replacement: "text-blue-500"
  },
  // Catch remaining bg-slate-900
  {
    regex: /bg-slate-900/g,
    replacement: "bg-white/40 backdrop-blur-md shadow-sm border border-white/50"
  }
];

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
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

// Baut die eigenständige Datei KB-Transformer.html (alle Bibliotheken eingebettet).
// Aufruf: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const src = readFileSync('src/index.html', 'utf8');
const out = src.replace(/<!-- INLINE:(\S+) -->/g, (_, file) => {
  const js = readFileSync(file, 'utf8').replace(/<\/script/gi, '<\\/script');
  return `<script>/* ${file} */\n${js}\n</script>`;
});
writeFileSync('KB-Transformer.html', out);
console.log(`KB-Transformer.html geschrieben (${Math.round(out.length / 1024)} KB)`);

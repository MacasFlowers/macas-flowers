import { minify } from 'terser';
import * as LightningCSS from 'lightningcss';
import { minify as minHTML } from 'html-minifier-terser';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

// 1. Crear carpetas
['docs/assets/css', 'docs/assets/js', 'docs/assets/img/icons'].forEach(dir => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
});

// 2. CSS
const css = readFileSync('css/style.css', 'utf8');
const { code } = LightningCSS.transform({ code: Buffer.from(css), minify: true });
writeFileSync('docs/assets/css/main.min.css', code);

// 3. JS
const js = readFileSync('js/main.js', 'utf8');
const minJS = await minify(js);
writeFileSync('docs/assets/js/main.min.js', minJS.code);

// 4. Imágenes WebP
await sharp('img/logo.jpg').webp({ quality: 85 }).toFile('docs/assets/img/logo-800.webp');
await sharp('img/ramo1.jpeg').webp({ quality: 85 }).toFile('docs/assets/img/ramo1-800.webp');
await sharp('img/ramo2.jpeg').webp({ quality: 85 }).toFile('docs/assets/img/ramo2-800.webp');
await sharp('img/ramo3.jpg').webp({ quality: 85 }).toFile('docs/assets/img/ramo3-800.webp');

// 5. Íconos PWA
const logo = readFileSync('img/logo.jpg');
await sharp(logo).resize(192, 192, { fit: 'contain', background: '#f8e8f8' }).png().toFile('docs/assets/img/icons/icon-192.png');
await sharp(logo).resize(512, 512, { fit: 'contain', background: '#f8e8f8' }).png().toFile('docs/assets/img/icons/icon-512.png');

// 6. HTML (reemplaza rutas)
const html = readFileSync('index.html', 'utf8')
  .replace('css/style.css', 'assets/css/main.min.css')
  .replace('js/main.js', 'assets/js/main.min.js')
  .replace(/img\/logo\.jpg/g, 'assets/img/logo-800.webp')
  .replace(/img\/ramo1\.jpeg/g, 'assets/img/ramo1-800.webp')
  .replace(/img\/ramo2\.jpeg/g, 'assets/img/ramo2-800.webp')
  .replace(/img\/ramo3\.jpg/g, 'assets/img/ramo3-800.webp');
const mini = await minHTML(html, { collapseWhitespace: true, removeComments: true });
writeFileSync('docs/index.html', mini);

console.log('✅ Build completo');
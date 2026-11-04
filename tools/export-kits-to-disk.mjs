/* Script determinista para materializar los 26 Kits de Archivos Semilla en la carpeta física kits/ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const kitsRoot = path.join(rootDir, 'kits');

const kitGen = require('../js/core/kit-generator.js');

fs.mkdirSync(kitsRoot, { recursive: true });

let totalFiles = 0;
const indexLines = [
  '# Catálogo Físico de Kits de Archivos Semilla (Ejercicios 01 al 26)',
  '',
  '> **Aviso sobre materiales de práctica:** Todos los documentos, facturas, contratos, esquemas SQL y registros contenidos en estas carpetas fueron preparados con fines exclusivamente pedagógicos para aprender Google Antigravity y no contienen datos personales ni empresariales reales.',
  '',
  '| Ejercicio | Carpeta Local | Archivos Incluidos | Resumen |',
  '| :--- | :--- | :--- | :--- |'
];

for (let id = 1; id <= 26; id++) {
  const meta = kitGen.getKitMetadata(id);
  const files = kitGen.getKitFiles(id);
  const folderPath = path.join(kitsRoot, meta.folderName);
  fs.mkdirSync(folderPath, { recursive: true });

  const names = [];
  files.forEach((f) => {
    const targetFile = path.join(folderPath, f.filename);
    fs.writeFileSync(targetFile, f.content, 'utf8');
    names.push('`' + f.filename + '`');
    totalFiles++;
  });

  indexLines.push(`| **Ejercicio ${String(id).padStart(2, '0')}** | \`kits/${meta.folderName}/\` | ${names.join(', ')} | ${meta.summary} |`);
}

fs.writeFileSync(path.join(kitsRoot, 'README.md'), indexLines.join('\n') + '\n', 'utf8');
console.log(`Exportados 26 kits en ${kitsRoot} (${totalFiles} archivos físicos listos).`);

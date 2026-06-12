import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notesDir = path.join(__dirname, '../public/notes');
const manifestPath = path.join(notesDir, 'notes-manifest.json');

// Read all .md files from the notes directory
const files = fs.readdirSync(notesDir);
const mdFiles = files.filter(file => file.endsWith('.md') && file !== 'notes-manifest.json');

// Generate manifest
const manifest = mdFiles.map((file, index) => {
    const name = file
        .replace('.md', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    return {
        id: file.replace('.md', ''),
        file: file,
        name: name,
        order: index + 1
    };
});

// Sort by name or custom order
manifest.sort((a, b) => a.name.localeCompare(b.name));

// Write manifest file
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`✅ Generated manifest with ${manifest.length} notes`);
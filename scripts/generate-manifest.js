import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const notesDir = path.join(__dirname, '../public/notes');
const questionsDir = path.join(__dirname, '../public/questions');
const manifestPath = path.join(__dirname, '../public/manifest.json');

// Helper function to convert filename to display name
function formatName(filename) {
    return filename
        .replace(/\.(md|json)$/, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Read notes (.md files)
const notes = [];
if (fs.existsSync(notesDir)) {
    const noteFiles = fs.readdirSync(notesDir);
    const mdFiles = noteFiles.filter(file => file.endsWith('.md'));
    
    mdFiles.forEach((file, index) => {
        notes.push({
            id: file.replace('.md', ''),
            file: file,
            name: formatName(file),
            type: 'note',
            order: index + 1
        });
    });
}

// Read questions (.json files)
const questions = [];
if (fs.existsSync(questionsDir)) {
    const questionFiles = fs.readdirSync(questionsDir);
    const jsonFiles = questionFiles.filter(file => file.endsWith('.json'));
    
    jsonFiles.forEach((file, index) => {
        const name = file.replace('.json', '');
        questions.push({
            id: name,
            file: file,
            name: formatName(file),
            type: 'quiz',
            order: index + 1,
            date: name // For date-based quizzes
        });
    });
}

// Combine both
const manifest = {
    notes: notes.sort((a, b) => a.name.localeCompare(b.name)),
    questions: questions.sort((a, b) => a.name.localeCompare(b.name)),
    total: {
        notes: notes.length,
        questions: questions.length
    },
    lastUpdated: new Date().toISOString()
};

// Write manifest file
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`✅ Generated manifest.json`);
console.log(`   - ${notes.length} notes found`);
console.log(`   - ${questions.length} question sets found`);
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const unitsDir = path.join(__dirname, '../public/units');
const manifestPath = path.join(__dirname, '../public/manifest.json');

// Helper function to format name
function formatName(str) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Helper function to format practice name - keep it simple
function formatPracticeName(filename) {
    // Remove 'practice-' prefix and '.json' suffix
    let name = filename.replace('practice-', '').replace('.json', '');

    // If it's a number, create "Practice X"
    if (!isNaN(name)) {
        return `Practice ${name}`;
    }

    // Otherwise format the name
    return formatName(name);
}

// Read all units
const units = [];

if (fs.existsSync(unitsDir)) {
    const unitFolders = fs.readdirSync(unitsDir);

    unitFolders.forEach(unitFolder => {
        const unitPath = path.join(unitsDir, unitFolder);
        if (fs.statSync(unitPath).isDirectory()) {
            const unit = {
                id: unitFolder,
                name: formatName(unitFolder),
                topics: []
            };

            // Read topics inside unit
            const topicFolders = fs.readdirSync(unitPath);

            topicFolders.forEach(topicFolder => {
                const topicPath = path.join(unitPath, topicFolder);
                if (fs.statSync(topicPath).isDirectory()) {
                    const topic = {
                        id: topicFolder,
                        name: formatName(topicFolder),
                        notes: null,
                        practices: []
                    };

                    // Check for notes.md
                    const notesPath = path.join(topicPath, 'notes.md');
                    if (fs.existsSync(notesPath)) {
                        topic.notes = {
                            file: `units/${unitFolder}/${topicFolder}/notes.md`,
                            name: 'Notes'  // Simple "Notes" name
                        };
                    }

                    // Check for practice JSON files
                    const files = fs.readdirSync(topicPath);
                    const practiceFiles = files.filter(file => file.startsWith('practice-') && file.endsWith('.json'));

                    practiceFiles.forEach(practiceFile => {
                        const practiceId = practiceFile.replace('.json', '');
                        topic.practices.push({
                            id: practiceId,
                            file: `units/${unitFolder}/${topicFolder}/${practiceFile}`,
                            name: formatPracticeName(practiceFile)  // Simple practice name
                        });
                    });

                    if (topic.notes || topic.practices.length > 0) {
                        unit.topics.push(topic);
                    }
                }
            });

            if (unit.topics.length > 0) {
                units.push(unit);
            }
        }
    });
}

const manifest = {
    units: units,
    total: {
        units: units.length,
        topics: units.reduce((acc, unit) => acc + unit.topics.length, 0),
        notes: units.reduce((acc, unit) => acc + unit.topics.filter(t => t.notes).length, 0),
        practices: units.reduce((acc, unit) => acc + unit.topics.reduce((a, t) => a + t.practices.length, 0), 0)
    },
    lastUpdated: new Date().toISOString()
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`✅ Generated manifest.json`);
console.log(`   - ${manifest.total.units} units`);
console.log(`   - ${manifest.total.topics} topics`);
console.log(`   - ${manifest.total.notes} notes`);
console.log(`   - ${manifest.total.practices} practice sets`);
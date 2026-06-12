import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

function Home() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // Fetch the manifest file
                const response = await fetch('/notes/notes-manifest.json');
                const manifest = await response.json();

                // Verify each note exists and get file info
                const existingNotes = await Promise.all(
                    manifest.map(async (note) => {
                        try {
                            const fileResponse = await fetch(`/notes/${note.file}`, { method: 'HEAD' });
                            if (fileResponse.ok) {
                                return note;
                            }
                            return null;
                        } catch {
                            return null;
                        }
                    })
                );

                setNotes(existingNotes.filter(note => note !== null));
                setLoading(false);
            } catch (error) {
                console.error('Error loading notes manifest:', error);
                setNotes([]);
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white font-mono flex items-center justify-center">
                <div className="text-black opacity-40 text-xs">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-mono">
            <div className="border-b border-gray-100 px-6 py-2">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-12 gap-4 text-xs text-black opacity-40">
                        <div className="col-span-8">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-6 py-2">
                <div className="space-y-0.5">
                    {notes.map((note) => (
                        <Link
                            key={note.id}
                            to={`/note/${note.id}`}
                            state={{ noteFile: note.file, noteName: note.name }}
                            className="grid grid-cols-12 gap-4 px-2 py-1.5 rounded hover:bg-gray-50 transition-colors group"
                        >
                            <div className="col-span-8 flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-black opacity-40" />
                                <span className="text-sm text-black opacity-80 group-hover:opacity-100">
                                    {note.name}
                                </span>
                            </div>
                            <div className="col-span-2 text-xs text-black opacity-40">
                                Markdown
                            </div>
                            <div className="col-span-2 text-xs text-black opacity-40">
                                ~2 KB
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white">
                <div className="max-w-4xl mx-auto px-6 py-2">
                    <div className="text-xs text-black opacity-40">
                        {notes.length} items
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
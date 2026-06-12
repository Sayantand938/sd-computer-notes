import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, HelpCircle } from 'lucide-react';

function Home() {
    const [notes, setNotes] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchManifest = async () => {
            try {
                const response = await fetch('/manifest.json');
                const manifest = await response.json();

                // Verify each note exists
                const existingNotes = await Promise.all(
                    manifest.notes.map(async (note) => {
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

                // Verify each question set exists
                const existingQuestions = await Promise.all(
                    manifest.questions.map(async (question) => {
                        try {
                            const fileResponse = await fetch(`/questions/${question.file}`, { method: 'HEAD' });
                            if (fileResponse.ok) {
                                return question;
                            }
                            return null;
                        } catch {
                            return null;
                        }
                    })
                );

                setNotes(existingNotes.filter(note => note !== null));
                setQuestions(existingQuestions.filter(q => q !== null));
                setLoading(false);
            } catch (error) {
                console.error('Error loading manifest:', error);
                setNotes([]);
                setQuestions([]);
                setLoading(false);
            }
        };

        fetchManifest();
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
            {/* Column headers */}
            <div className="border-b border-gray-100 px-6 py-2">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-12 gap-4 text-xs text-black opacity-40">
                        <div className="col-span-8">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <main className="max-w-4xl mx-auto px-6 py-2">
                {/* Notes Section */}
                {notes.length > 0 && (
                    <>
                        <div className="text-xs text-black opacity-40 px-2 py-2">
                            Notes
                        </div>
                        <div className="space-y-0.5 mb-6">
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
                    </>
                )}

                {/* Study Guides Section */}
                {questions.length > 0 && (
                    <>
                        <div className="text-xs text-black opacity-40 px-2 py-2 mt-4 border-t border-gray-100 pt-4">
                            Study Guides
                        </div>
                        <div className="space-y-0.5">
                            {questions.map((guide) => (
                                <Link
                                    key={guide.id}
                                    to={`/study/${guide.id}`}
                                    className="grid grid-cols-12 gap-4 px-2 py-1.5 rounded hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="col-span-8 flex items-center gap-2">
                                        <HelpCircle className="w-3.5 h-3.5 text-black opacity-40" />
                                        <span className="text-sm text-black opacity-80 group-hover:opacity-100">
                                            {guide.name}
                                        </span>
                                    </div>
                                    <div className="col-span-2 text-xs text-black opacity-40">
                                        Study Guide
                                    </div>
                                    <div className="col-span-2 text-xs text-black opacity-40">
                                        Q&A
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {/* Empty state */}
                {notes.length === 0 && questions.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-black opacity-60 text-sm mb-2">No content found</div>
                        <div className="text-black opacity-40 text-xs">Add .md files to /public/notes/ or .json files to /public/questions/</div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white">
                <div className="max-w-4xl mx-auto px-6 py-2">
                    <div className="flex justify-between items-center text-xs text-black opacity-40">
                        <span>{notes.length + questions.length} items</span>
                        <div className="flex gap-4">
                            <span>{notes.length} notes</span>
                            <span>{questions.length} study guides</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
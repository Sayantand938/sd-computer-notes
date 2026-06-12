import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FolderOpen,
    FileText,
    HelpCircle,
    ChevronDown,
    ChevronRight,
    BookOpen,
    ClipboardList
} from 'lucide-react';

function Home() {
    const [manifest, setManifest] = useState(null);
    const [expandedUnits, setExpandedUnits] = useState({});
    const [expandedTopics, setExpandedTopics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/manifest.json')
            .then(response => {
                if (!response.ok) throw new Error('Manifest not found');
                return response.json();
            })
            .then(data => {
                setManifest(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading manifest:', error);
                setError(true);
                setLoading(false);
            });
    }, []);

    const toggleUnit = (unitId) => {
        setExpandedUnits(prev => ({
            ...prev,
            [unitId]: !prev[unitId]
        }));
    };

    const toggleTopic = (topicId) => {
        setExpandedTopics(prev => ({
            ...prev,
            [topicId]: !prev[topicId]
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white font-mono flex items-center justify-center">
                <div className="text-black opacity-40 text-xs">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white font-mono flex items-center justify-center">
                <div className="text-center">
                    <div className="text-black opacity-60 text-sm mb-2">Failed to load content</div>
                    <div className="text-black opacity-40 text-xs">Run: npm run generate</div>
                </div>
            </div>
        );
    }

    if (!manifest?.units || manifest.units.length === 0) {
        return (
            <div className="min-h-screen bg-white font-mono flex items-center justify-center">
                <div className="text-center">
                    <div className="text-black opacity-60 text-sm mb-2">No content found</div>
                    <div className="text-black opacity-40 text-xs">Add units to /public/units/ and run: npm run generate</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-mono">
            <div className="border-b border-gray-100 px-6 py-3">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-black opacity-40" />
                        <span className="text-sm text-black opacity-60">Study Materials</span>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-6 py-4">
                <div className="space-y-1">
                    {manifest.units.map((unit) => (
                        <div key={unit.id}>
                            <div
                                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer"
                                onClick={() => toggleUnit(unit.id)}
                            >
                                {expandedUnits[unit.id] ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-black opacity-40" />
                                ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-black opacity-40" />
                                )}
                                <FolderOpen className="w-3.5 h-3.5 text-black opacity-40" />
                                <span className="text-sm font-medium text-black opacity-80">
                                    {unit.name}
                                </span>
                                <span className="text-xs text-black opacity-30 ml-auto">
                                    {unit.topics?.length || 0} topics
                                </span>
                            </div>

                            {expandedUnits[unit.id] && unit.topics && (
                                <div className="ml-6 space-y-0.5 mt-0.5">
                                    {unit.topics.map((topic) => (
                                        <div key={topic.id}>
                                            <div
                                                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer"
                                                onClick={() => toggleTopic(topic.id)}
                                            >
                                                {expandedTopics[topic.id] ? (
                                                    <ChevronDown className="w-3 h-3 text-black opacity-40" />
                                                ) : (
                                                    <ChevronRight className="w-3 h-3 text-black opacity-40" />
                                                )}
                                                <span className="text-sm text-black opacity-70">
                                                    {topic.name}
                                                </span>
                                                <div className="flex items-center gap-2 ml-auto">
                                                    {topic.notes && (
                                                        <FileText className="w-3 h-3 text-black opacity-30" />
                                                    )}
                                                    {topic.practices?.length > 0 && (
                                                        <ClipboardList className="w-3 h-3 text-black opacity-30" />
                                                    )}
                                                    <span className="text-xs text-black opacity-30">
                                                        {topic.practices?.length || 0}
                                                    </span>
                                                </div>
                                            </div>

                                            {expandedTopics[topic.id] && (
                                                <div className="ml-6 space-y-0.5 mt-0.5">
                                                    {topic.notes && (
                                                        <Link
                                                            to={`/note/${unit.id}/${topic.id}`}
                                                            state={{
                                                                noteFile: `/${topic.notes.file}`,
                                                                noteName: `${topic.name} - Notes`
                                                            }}
                                                            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 transition-colors group"
                                                        >
                                                            <FileText className="w-3 h-3 text-black opacity-40" />
                                                            <span className="text-xs text-black opacity-70 group-hover:opacity-100">
                                                                Study Notes
                                                            </span>
                                                        </Link>
                                                    )}

                                                    {topic.practices?.map((practice) => (
                                                        <Link
                                                            key={practice.id}
                                                            to={`/study/${unit.id}/${topic.id}/${practice.id}`}
                                                            state={{
                                                                practiceFile: `/${practice.file}`,
                                                                practiceName: practice.name
                                                            }}
                                                            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 transition-colors group"
                                                        >
                                                            <HelpCircle className="w-3 h-3 text-black opacity-40" />
                                                            <span className="text-xs text-black opacity-70 group-hover:opacity-100">
                                                                {practice.name}
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white">
                <div className="max-w-4xl mx-auto px-6 py-2">
                    <div className="flex justify-between items-center text-xs text-black opacity-40">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <FolderOpen className="w-3 h-3" />
                                <span>{manifest.total?.units || 0} units</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                <span>{manifest.total?.topics || 0} topics</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                <span>{manifest.total?.notes || 0} notes</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <ClipboardList className="w-3 h-3" />
                                <span>{manifest.total?.practices || 0} practice sets</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
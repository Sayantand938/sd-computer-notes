import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, Printer } from 'lucide-react';
import { rehypeMermaid, MermaidBlock } from 'react-markdown-mermaid';

function NoteView() {
    const location = useLocation();
    const navigate = useNavigate();
    const { noteFile, noteName } = location.state || {};

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!noteFile) {
            navigate('/');
            return;
        }

        setLoading(true);
        fetch(`/notes/${noteFile}`)
            .then(response => {
                if (!response.ok) throw new Error('Note not found');
                return response.text();
            })
            .then(text => {
                setContent(text);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading note:', error);
                setContent('# Error\n\nFailed to load the note.');
                setLoading(false);
            });
    }, [noteFile, navigate]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                navigate('/');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    if (!noteFile) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white font-mono">
            <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
                <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-1.5 text-sm text-black opacity-60 hover:opacity-100 transition-opacity"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </button>

                    <span className="text-sm text-black opacity-60 truncate max-w-md">
                        {noteName || 'Note'}
                    </span>

                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-1.5 text-sm text-black opacity-60 hover:opacity-100 transition-opacity"
                    >
                        <Printer className="w-4 h-4" />
                        <span>Print</span>
                    </button>
                </div>
            </header>

            <main className="pt-14 pb-16">
                {loading ? (
                    <div className="flex justify-center items-center h-64 text-black opacity-60 text-sm">
                        loading...
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto px-6">
                        <div className="markdown-content">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[[rehypeMermaid, { mermaidConfig: { theme: 'default', startOnLoad: true } }]]}
                                components={{
                                    MermaidBlock: MermaidBlock,
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const language = match ? match[1] : '';

                                        if (!inline && language) {
                                            return (
                                                <SyntaxHighlighter
                                                    style={vscDarkPlus}
                                                    language={language}
                                                    PreTag="div"
                                                    className="rounded-lg text-sm my-4"
                                                    customStyle={{ fontWeight: '500' }}
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            );
                                        }

                                        return (
                                            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-black text-sm" {...props}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 sm:hidden">
                <div className="max-w-2xl mx-auto px-6 py-3">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center justify-center gap-1.5 text-sm text-black opacity-60 py-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to all notes</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default NoteView;
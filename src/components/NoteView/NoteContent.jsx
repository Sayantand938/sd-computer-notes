import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { rehypeMermaid, MermaidBlock } from 'react-markdown-mermaid';

function NoteContent({ content }) {
    return (
        <div className="max-w-3xl mx-auto px-6">
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
                                        style={prism}
                                        language={language}
                                        PreTag="div"
                                        className="rounded-lg text-sm my-4"
                                        customStyle={{
                                            fontWeight: '500',
                                            background: '#f8f9fa',
                                            margin: '1em 0'
                                        }}
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
    );
}

export default NoteContent;
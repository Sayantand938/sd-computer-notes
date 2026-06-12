import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, Printer } from 'lucide-react';

function StudyGuide() {
    const location = useLocation();
    const navigate = useNavigate();
    const { practiceFile, practiceName } = location.state || {};

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!practiceFile) {
            setError(true);
            setLoading(false);
            return;
        }

        console.log('Fetching practice from:', practiceFile);

        fetch(practiceFile)
            .then(response => {
                if (!response.ok) throw new Error('Practice set not found');
                return response.json();
            })
            .then(data => {
                setQuestions(data);
                setLoading(false);
                setError(false);
            })
            .catch(error => {
                console.error('Error loading practice set:', error);
                setError(true);
                setLoading(false);
            });
    }, [practiceFile]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white font-mono flex items-center justify-center">
                <div className="text-black opacity-40 text-xs">Loading...</div>
            </div>
        );
    }

    if (error || questions.length === 0) {
        return (
            <div className="min-h-screen bg-white font-mono flex items-center justify-center">
                <div className="text-center">
                    <div className="text-black opacity-60 text-sm mb-2">Practice set not found</div>
                    <Link to="/" className="text-xs text-black opacity-40 hover:opacity-60">
                        ← Back
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-mono">
            <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
                <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-1.5 text-sm text-black opacity-60 hover:opacity-100 transition-opacity"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </button>

                    <span className="text-sm text-black opacity-60 truncate max-w-md">
                        {practiceName || 'Study Guide'}
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

            <main className="pt-16 pb-8">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="space-y-8">
                        {questions.map((item, index) => (
                            <div key={index} className="border-b border-gray-100 pb-6">
                                <div className="mb-4">
                                    <div className="text-xs text-black opacity-40 mb-1">
                                        Question {item.sl || index + 1}
                                    </div>
                                    <div className="text-base font-semibold text-black">
                                        {item.question}
                                    </div>
                                </div>

                                <div className="space-y-2 pl-0">
                                    {[1, 2, 3, 4].map((num) => {
                                        const optionKey = `op${num}`;
                                        const optionText = item[optionKey];
                                        const isCorrect = num === item.answer;

                                        return (
                                            <div key={num} className="flex items-center gap-2">
                                                <div className="text-sm text-black opacity-60 min-w-[24px]">
                                                    {String.fromCharCode(64 + num)}.
                                                </div>
                                                <div className="text-sm text-black opacity-80">
                                                    {optionText}
                                                </div>
                                                {isCorrect && (
                                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white">
                <div className="max-w-4xl mx-auto px-6 py-2">
                    <div className="text-xs text-black opacity-40">
                        {questions.length} questions
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default StudyGuide;
import { ArrowLeft, Printer, Eye, EyeOff } from 'lucide-react';

function StudyHeader({ title, onBack, onPrint, showAnswers, onToggleAnswers }) {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
            <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-sm text-black opacity-60 hover:opacity-100 transition-opacity"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                </button>

                <span className="text-sm text-black opacity-60 truncate max-w-md">
                    {title || 'Study Guide'}
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onToggleAnswers}
                        className="text-black opacity-60 hover:opacity-100 transition-opacity p-1"
                        title={showAnswers ? "Hide Answers" : "Show Answers"}
                    >
                        {showAnswers ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                    </button>
                    <button
                        onClick={onPrint}
                        className="text-black opacity-60 hover:opacity-100 transition-opacity p-1"
                        title="Print"
                    >
                        <Printer className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default StudyHeader;
import { ArrowLeft } from 'lucide-react';

function NoteFooter({ onBack }) {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 sm:hidden">
            <div className="max-w-2xl mx-auto px-6 py-3">
                <button
                    onClick={onBack}
                    className="w-full flex items-center justify-center gap-1.5 text-sm text-black opacity-60 py-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to all notes</span>
                </button>
            </div>
        </footer>
    );
}

export default NoteFooter;
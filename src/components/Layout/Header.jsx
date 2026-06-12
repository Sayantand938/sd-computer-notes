import { BookOpen } from 'lucide-react';

function Header() {
    return (
        <div className="border-b border-gray-100 px-6 py-3">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-black opacity-40" />
                    <span className="text-sm text-black opacity-60">Study Materials</span>
                </div>
            </div>
        </div>
    );
}

export default Header;
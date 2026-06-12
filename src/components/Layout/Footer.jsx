import { FolderOpen, BookOpen, FileText, ClipboardList } from 'lucide-react';

function Footer({ manifest }) {
    return (
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
    );
}

export default Footer;
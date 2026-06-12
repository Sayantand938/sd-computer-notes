import { Link } from 'react-router-dom';
import { FileText, HelpCircle } from 'lucide-react';

function ContentItems({ unitId, topicId, topic }) {
    return (
        <div className="ml-6 space-y-0.5 mt-0.5">
            {topic.notes && (
                <Link
                    key="notes"
                    to={`/note/${unitId}/${topicId}`}
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

            {topic.practices?.map((practice, index) => (
                <Link
                    key={practice.id || index}
                    to={`/study/${unitId}/${topicId}/${practice.id}`}
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
    );
}

export default ContentItems;
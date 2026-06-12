import { ChevronDown, ChevronRight, FileText, ClipboardList } from 'lucide-react';
import ContentItems from './ContentItems';

function TopicItem({ unitId, topic, isExpanded, onToggle }) {
    return (
        <div>
            <div
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer"
                onClick={onToggle}
            >
                {isExpanded ? (
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

            {isExpanded && (
                <ContentItems unitId={unitId} topicId={topic.id} topic={topic} />
            )}
        </div>
    );
}

export default TopicItem;
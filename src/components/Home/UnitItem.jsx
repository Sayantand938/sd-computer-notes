import { useState } from 'react';
import { FolderOpen, ChevronDown, ChevronRight } from 'lucide-react';
import TopicItem from './TopicItem';

function UnitItem({ unit }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedTopics, setExpandedTopics] = useState({});

    const toggleTopic = (topicId) => {
        setExpandedTopics(prev => ({
            ...prev,
            [topicId]: !prev[topicId]
        }));
    };

    return (
        <div>
            <div
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? (
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

            {isExpanded && unit.topics && (
                <div className="ml-6 space-y-0.5 mt-0.5">
                    {unit.topics.map((topic) => (
                        <TopicItem
                            key={topic.id}
                            unitId={unit.id}
                            topic={topic}
                            isExpanded={expandedTopics[topic.id]}
                            onToggle={() => toggleTopic(topic.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default UnitItem;
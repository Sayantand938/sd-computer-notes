import { Check } from 'lucide-react';

function QuestionCard({ question, index }) {
    return (
        <div className="border-b border-gray-100 pb-6">
            <div className="mb-4">
                <div className="text-xs text-black opacity-40 mb-1">
                    Question {question.sl || index + 1}
                </div>
                <div className="text-base font-semibold text-black">
                    {question.question}
                </div>
            </div>

            <div className="space-y-2 pl-0">
                {[1, 2, 3, 4].map((num) => {
                    const optionKey = `op${num}`;
                    const optionText = question[optionKey];
                    const isCorrect = num === question.answer;

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
    );
}

export default QuestionCard;
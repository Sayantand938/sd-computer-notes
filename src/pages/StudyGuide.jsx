import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStudyGuide } from '../hooks/useStudyGuide';
import StudyHeader from '../components/StudyGuide/StudyHeader';
import QuestionCard from '../components/StudyGuide/QuestionCard';
import StudyFooter from '../components/StudyGuide/StudyFooter';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

function StudyGuide() {
    const location = useLocation();
    const navigate = useNavigate();
    const { practiceFile, practiceName } = location.state || {};
    const { questions, loading, error } = useStudyGuide(practiceFile);
    const [showAnswers, setShowAnswers] = useState(true);

    const handleBack = () => navigate('/');
    const handlePrint = () => window.print();
    const toggleAnswers = () => setShowAnswers(!showAnswers);

    if (loading) return <LoadingSpinner message="Loading study guide..." />;
    if (error) return <ErrorMessage message="Practice set not found" />;
    if (!questions.length) return <ErrorMessage message="No questions found" />;

    return (
        <div className="min-h-screen bg-white font-mono">
            <StudyHeader
                title={practiceName}
                onBack={handleBack}
                onPrint={handlePrint}
                showAnswers={showAnswers}
                onToggleAnswers={toggleAnswers}
            />
            <main className="pt-16 pb-8">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="space-y-8">
                        {questions.map((question, index) => (
                            <QuestionCard
                                key={index}
                                question={question}
                                index={index}
                                showAnswers={showAnswers}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <StudyFooter questionCount={questions.length} />
        </div>
    );
}

export default StudyGuide;
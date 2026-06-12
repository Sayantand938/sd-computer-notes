import { useNavigate, useLocation } from 'react-router-dom';
import { useNote } from '../hooks/useNote';
import NoteHeader from '../components/NoteView/NoteHeader';
import NoteContent from '../components/NoteView/NoteContent';
import NoteFooter from '../components/NoteView/NoteFooter';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

function NoteView() {
    const location = useLocation();
    const navigate = useNavigate();
    const { noteFile, noteName } = location.state || {};
    const { content, loading, error } = useNote(noteFile);

    const handleBack = () => navigate('/');
    const handlePrint = () => window.print();

    if (loading) return <LoadingSpinner message="loading note..." />;
    if (error) return <ErrorMessage message="Failed to load note" suggestion={`File: ${noteFile}`} />;

    return (
        <div className="min-h-screen bg-white font-mono">
            <NoteHeader
                noteName={noteName}
                onBack={handleBack}
                onPrint={handlePrint}
            />
            <main className="pt-14 pb-16">
                <NoteContent content={content} />
            </main>
            <NoteFooter onBack={handleBack} />
        </div>
    );
}

export default NoteView;
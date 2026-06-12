function StudyFooter({ questionCount }) {
    return (
        <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white">
            <div className="max-w-4xl mx-auto px-6 py-2">
                <div className="text-xs text-black opacity-40">
                    {questionCount} questions
                </div>
            </div>
        </footer>
    );
}

export default StudyFooter;
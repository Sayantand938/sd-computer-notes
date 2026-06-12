import { useState, useEffect } from 'react';

export function useStudyGuide(practiceFile) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!practiceFile) {
            setError(true);
            setLoading(false);
            return;
        }
        
        console.log('Fetching practice from:', practiceFile);
        
        fetch(practiceFile)
            .then(response => {
                if (!response.ok) throw new Error('Practice set not found');
                return response.json();
            })
            .then(data => {
                setQuestions(data);
                setLoading(false);
                setError(false);
            })
            .catch(error => {
                console.error('Error loading practice set:', error);
                setError(true);
                setLoading(false);
            });
    }, [practiceFile]);

    return { questions, loading, error };
}
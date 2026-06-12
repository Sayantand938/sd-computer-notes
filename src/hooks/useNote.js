import { useState, useEffect } from 'react';

export function useNote(noteFile) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!noteFile) {
            setError(true);
            setLoading(false);
            return;
        }
        
        console.log('Fetching note from:', noteFile);
        
        fetch(noteFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                if (text.trim().startsWith('<!doctype') || text.trim().startsWith('<html')) {
                    throw new Error('File not found');
                }
                setContent(text);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading note:', error);
                setContent(`# Error\n\nFailed to load the note.\n\nFile: ${noteFile}`);
                setError(true);
                setLoading(false);
            });
    }, [noteFile]);

    return { content, loading, error };
}
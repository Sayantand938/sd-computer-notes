import { useState, useEffect } from 'react';

export function useManifest() {
    const [manifest, setManifest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/manifest.json')
            .then(response => {
                if (!response.ok) throw new Error('Manifest not found');
                return response.json();
            })
            .then(data => {
                setManifest(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading manifest:', error);
                setError(true);
                setLoading(false);
            });
    }, []);

    return { manifest, loading, error };
}
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import UnitItem from '../components/Home/UnitItem';
import { useManifest } from '../hooks/useManifest';

function Home() {
    const { manifest, loading, error } = useManifest();

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage />;
    if (!manifest?.units || manifest.units.length === 0) {
        return <ErrorMessage message="No content found" />;
    }

    return (
        <div className="min-h-screen bg-white font-mono">
            <Header />
            <main className="max-w-4xl mx-auto px-6 py-4">
                <div className="space-y-1">
                    {manifest.units.map((unit) => (
                        <UnitItem key={unit.id} unit={unit} />
                    ))}
                </div>
            </main>
            <Footer manifest={manifest} />
        </div>
    );
}

export default Home;
function LoadingSpinner({ message = "loading..." }) {
    return (
        <div className="min-h-screen bg-white font-mono flex items-center justify-center">
            <div className="text-black opacity-60 text-sm">{message}</div>
        </div>
    );
}

export default LoadingSpinner;
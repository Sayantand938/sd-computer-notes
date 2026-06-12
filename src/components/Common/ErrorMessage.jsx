function ErrorMessage({ message = "Failed to load content", suggestion = "Check that the file exists" }) {
    return (
        <div className="min-h-screen bg-white font-mono flex items-center justify-center">
            <div className="text-center">
                <div className="text-black opacity-60 text-sm mb-2">{message}</div>
                <div className="text-black opacity-40 text-xs">{suggestion}</div>
            </div>
        </div>
    );
}

export default ErrorMessage;
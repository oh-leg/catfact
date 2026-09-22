interface ErrorProps {
    error: string;
}

function Error({error}:ErrorProps){
    return (
        <div className="error-wrapper">
            <div className="error">
                {error}
            </div>
        </div>
    )
}

export default Error;
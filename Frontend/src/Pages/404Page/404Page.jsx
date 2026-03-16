import { useNavigate } from "react-router-dom";
import "./404Page.css";
export const PageNotFoundPg = () => {
    const navigate = useNavigate();
    return (
        <main className="errPgBody">
            <div className="container">
                <h1>404</h1>
                <h2>Oops! Page not found</h2>
                <p>The page you are looking for might be under process, had its name changed, or is temporarily unavailable.
                </p>
                <button className="btn" onClick={() => { navigate("/") }}>Go to Home</button>
            </div>
        </main>
    )
}
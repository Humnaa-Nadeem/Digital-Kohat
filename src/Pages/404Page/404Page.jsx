import { useNavigate } from "react-router-dom";
import "./404Page.css";
export const PageNotFoundPg = () => {
    const navigate = useNavigate();
    return (
        <body className="errPgBody">
            <div class="container">
                <h1>404</h1>
                <h2>Oops! Page not found</h2>
                <p>The page you are looking for might be under process, had its name changed, or is temporarily unavailable.
                </p>
                <button class="btn" onClick={() => { navigate("/") }}>Go to Home</button>
            </div>
        </body>
    )
}
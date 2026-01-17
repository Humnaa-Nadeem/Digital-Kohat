import { useState } from "react";
import "./AdminLogin.css";
import { verfiyTheAdmin } from "../../../ApiCalls/DashBoardApiCalls";
import { ToastContainer } from "react-toastify";

export const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        verfiyTheAdmin(email, password);
    };

    return (
        <div className="Adm-login-wrapper">
            <ToastContainer />
            <div className="Adm-login-card">
                <h2>Admin Login</h2>
                <p>Secure access to your institute dashboard</p>

                <form onSubmit={handleSubmit}>
                    <div className="Adm-input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="admin@school.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="Adm-input-group">
                        <label>Password</label>
                        <div className="Adm-password-box">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => setShowPass(!showPass)}>
                                {showPass ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>

                    <button type="submit" className="Adm-login-btn">
                        Login
                    </button>
                </form>

                <div className="Adm-login-footer">
                    <span>Authorized admins only</span>
                </div>
            </div>
        </div>
    );
};

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Label from "../../components/Label";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import Alert from "../../components/Alert";
import GuestLayout from "../../layout/GuestLayout";

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameValid, setUsernameValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameValid(e.target.value.trim().length > 0);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordValid(e.target.value.length >= 8);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (usernameValid && passwordValid) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, username, password);
                const user = userCredential.user;
    
                setAlert({ show: true, type: "success", message: "Login successful! Redirecting..." });
                console.log("User logged in:", user);
    
                setTimeout(() => {
                    navigate("/products");
                }, 2000);
            } catch (error) {
                setAlert({ show: true, type: "error", message: error.message });
                console.error("Error:", error);
            }
        } else {
            setAlert({ show: true, type: "error", message: "Invalid credentials. Please check your inputs." });
            console.log("Username or password is invalid.");
        }
    };

    const getInputClassName = (isValid) => {
        if (isValid === null) return "block w-full p-2.5 mt-2 bg-gray-50 border border-gray-300 text-gray-900";
        return isValid ? "block w-full p-2.5 mt-2 border-2 border-green-500 text-green-500" : "block w-full p-2.5 mt-2 border-2 border-red-500 text-red-500";
    };

    return (
        <GuestLayout>
            <h1 className="text-center text-lg mb-3 text-gray-900 underline font-bold">
                SIGN IN
            </h1>
            {alert.show && <Alert type={alert.type} message={alert.message} />}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <Label className="text-gray-900">
                        Username
                    </Label>
                    <TextInput
                        type="text"
                        className={getInputClassName(usernameValid)}
                        placeholder="Enter your username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div>
                    <Label className="text-gray-900">
                        Password
                    </Label>
                    <TextInput
                        type="password"
                        className={getInputClassName(passwordValid)}
                        placeholder="•••••••••"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <PrimaryButton
                    type="submit"
                    className="px-5 py-2.5"
                >
                    Sign in
                </PrimaryButton>
                <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?  
                    <Link to="/auth/sign-up" className="ml-2 font-medium text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
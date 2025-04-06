import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import GuestLayout from "../../layout/GuestLayout";
import Label from "../../components/Label";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import Alert from "../../components/Alert";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailValid(e.target.value.includes("@"));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordValid(e.target.value.length >= 8); 
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordValid(e.target.value === password); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (emailValid && passwordValid && confirmPasswordValid) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                setAlert({ show: true, type: "success", message: "Registration successful! Redirecting to sign-in page..." });
                console.log("User registered:", user);

                setTimeout(() => {
                    navigate("/auth/sign-in");
                }, 3000);
            } catch (error) {
                setAlert({ show: true, type: "error", message: error.message });
                console.error("Error:", error);
            }
        } else {
            setAlert({ show: true, type: "error", message: "Invalid credentials. Please check your inputs." });
            console.log("Email is invalid or passwords do not match.");
        }
    };

    const getInputClassName = (isValid) => {
        if (isValid === null) return "block w-full p-2.5 mt-2 bg-gray-50 border border-gray-300 text-gray-900";
        return isValid ? "block w-full p-2.5 mt-2 border-2 border-green-500 text-green-500" : "block w-full p-2.5 mt-2 border-2 border-red-500 text-red-500";
    };

    return (
        <GuestLayout>
            <h1 className="text-center text-lg mb-3 text-gray-900 underline font-bold">
                SIGN UP
            </h1>
            {alert.show && <Alert type={alert.type} message={alert.message} />}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <Label className="text-gray-900">
                        Email
                    </Label>
                    <TextInput
                        type="email"
                        name="email"
                        id="email"
                        className={getInputClassName(emailValid)}
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <Label className="text-gray-900">
                        Enter Password
                    </Label>
                    <TextInput
                        type="password"
                        name="password"
                        id="password"
                        className={getInputClassName(passwordValid)}
                        placeholder="•••••••••"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div>
                    <Label className="text-gray-900">
                        Confirm Password
                    </Label>
                    <TextInput
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        className={getInputClassName(confirmPasswordValid)}
                        placeholder="•••••••••"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                </div>
                <PrimaryButton
                    type="submit"
                    className="px-5 py-2.5"
                >
                    Sign up
                </PrimaryButton>
                <p className="text-sm font-light text-gray-500">
                    Already have an account?  
                    <Link to="/auth/sign-in" className="ml-2 font-medium text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
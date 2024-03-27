import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, password, confirmedPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmedPassword, gender });
        if(!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    fullName, 
                    username, 
                    password, 
                    confirmedPassword, 
                    gender
                }),
            });

            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { loading, signup };
}

export default useSignup;

const handleInputErrors = ({fullName, username, password, confirmedPassword, gender}) => {
    if (!fullName || !username || !password || !confirmedPassword || !gender) {
        toast.error("Empty field(s)");
        return false;
    }

    if(password !== confirmedPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    const passwordLength = 6;

    if(password.length < passwordLength) {
        toast.error("Password must be at least six characters");
        return false;
    }

    return true;
}
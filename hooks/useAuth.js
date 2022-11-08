import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase";


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState('');
    const [loadingInitial, setLoadingInitial] = useState(true);

    const logout = () => {
        const displayName = auth.currentUser.displayName;
        signOut(auth).then(() => console.log(`${displayName} has logged out!`));
    }

    useEffect(() => onAuthStateChanged(auth, (user) => {
        if(user){
            setUser(user)
        }else{
            setUser(null);
        }
        setLoadingInitial(false);
    }))
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout
            }}
        >
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}



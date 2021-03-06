import * as React from "react";
import {Auth} from "aws-amplify";

const AuthContext = React.createContext<{isLoggedIn: boolean; user: any | null, setUser: any}>({
    isLoggedIn: false,
    user: null,
    setUser: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<string | null>(null);

    React.useEffect(() => {
        try {
            // TODO: ingelogde user ophalen en in de state opslaan met setUser
        } catch (err) {
            console.log(err);
            setUser(null);
        }
    }, [])

    const auth = {
        isLoggedIn: !!user,
        user,
        setUser,
    };

    return (
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    return React.useContext(AuthContext);
}

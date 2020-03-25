import { useContext } from "react";
import UserContext from "../context/UserContext";

const NavBar = () => {
    const { user, profile, usAdmin, signIn, signOut } = useContext(UserContext);
    return (
        <div>
            <nav>
                {user ? (
                    <button onClick={signIn}>Login</button>
                ) : (
                    <button onClick={signOut}>logout</button>
                )}
            </nav>
        </div>
    );
};

export default NavBar;

import { useContext } from "react";
import AppContext from "../context/AppContext";
import Link from "next/link";

const NavBar = () => {
    const { user, profile, usAdmin, signIn, signOut } = useContext(AppContext);
    console.log("NavBar -> profile", profile);
    return (
        <div>
            <nav>
                {profile ? (
                    <div>
                        <p>{profile.displayName}</p>
                        <button onClick={signOut}>logout</button>
                    </div>
                ) : (
                    <Link href="/auth/register">
                        <a className="btn" onClick={signIn}>
                            register
                        </a>
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default NavBar;

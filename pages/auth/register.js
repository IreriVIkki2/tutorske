import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import StyledInput from "../../components/forms/StyledInput";

const Register = () => {
    const { emailAndPasswordRegister, googleLogin, profile } = useContext(
        AppContext,
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isParent, setIsParent] = useState(true);

    console.log("Register -> profile", isParent);
    return (
        <div className="">
            <div className="">
                <img src="" alt="" className="" />
            </div>

            <div className="">
                <div>
                    <p className="title title--md mb-md">Join us Now</p>

                    <div>
                        <label htmlFor="isTutor">Register as tutor</label>
                        <input
                            type="checkbox"
                            name=""
                            id="isTutor"
                            value={!isParent}
                            onChange={e => setIsParent(!e.target.value)}
                        />
                    </div>

                    <div className="mb-sm">
                        <label htmlFor="name">Name</label>
                        <StyledInput
                            type="text"
                            onChange={name => setName(name)}
                            initialValue={name}
                            minLength="3"
                            id="name"
                        />
                    </div>
                    <div className="mb-sm">
                        <label htmlFor="Email">Email</label>
                        <StyledInput
                            type="email"
                            onChange={email => setEmail(email)}
                            initialValue={email}
                            minLength="3"
                            id="email"
                        />
                    </div>

                    <div className="mb-sm">
                        <label htmlFor="Password">Password</label>
                        <StyledInput
                            type="password"
                            onChange={password => setPassword(password)}
                            initialValue={password}
                            minLength="3"
                            id="password"
                        />
                    </div>

                    <button
                        className="btn"
                        onClick={() =>
                            emailAndPasswordRegister(
                                email,
                                password,
                                name,
                                isParent,
                            )
                        }
                    >
                        Register
                    </button>

                    <p className="mb-sm">or</p>

                    <div className="mb-sm">
                        <button
                            onClick={() => googleLogin(isParent)}
                            className="btn"
                        >
                            Sign Up With Google
                        </button>
                    </div>

                    <div className="mb-sm">
                        <button className="btn">Sign Up With Facebook</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

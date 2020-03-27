import React, { Fragment } from "react";
import App from "next/app";
import { client, firebase } from "../utils/client";
import crud from "../utils/crud";
import fetch from "isomorphic-unfetch";
import "react-quill/dist/quill.snow.css";
import "../public/main.css";
import Layout from "../components/Layout";

export default class MyApp extends App {
    static async getInitialProps({ ctx }) {
        const { req } = ctx;
        const user = req && req.session ? req.session.decodedToken : null;
        return { user };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            profile: null,
        };
    }

    addProfileListener = async uid => {
        let removeProfileListener = await client()
            .db.collection("profiles")
            .doc(uid)
            .onSnapshot(doc => {
                localStorage.setItem("profile", JSON.stringify(doc.data()));
                this.setState({
                    removeProfileListener,
                    profile: doc.data(),
                });
            });
    };

    componentDidMount() {
        const { user } = this.state;
        if (user) this.addProfileListener(user.uid);
        client().auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user });
                return user
                    .getIdToken()
                    .then(token => {
                        return fetch("/api/login", {
                            method: "POST",
                            headers: new Headers({
                                "Content-Type": "application/json",
                            }),
                            credentials: "same-origin",
                            body: JSON.stringify({ token }),
                        });
                    })
                    .then(() => console.log("add listener"));
            } else {
                this.setState({ user: null });
                fetch("/api/logout", {
                    method: "POST",
                    credentials: "same-origin",
                });
            }
        });
    }

    render() {
        const { Component } = this.props;
        const { user, profile } = this.state;

        return (
            <Fragment>
                <Layout
                    context={{
                        user,
                        profile,
                        googleLogin: this.handleGoogleLogin,
                        facebookLogin: this.handleFacebookLogin,
                        emailAndPasswordLogin: this.handleEmailAndPasswordLogin,
                        emailAndPasswordRegister: this
                            .handleEmailAndPasswordRegister,
                        signOut: this.handleLogout,
                    }}
                >
                    <Component />
                </Layout>
            </Fragment>
        );
    }

    handleEmailAndPasswordRegister = (email, password, username) => {
        console.log("handleEmailAndPasswordRegister -> username", username);
        client()
            .auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                if (result.additionalUserInfo.isNewUser) {
                    crud.createUserProfile(
                        {
                            ...result.user,
                            displayName: username,
                        },
                        isParent,
                    ).then(profile => {
                        localStorage.setItem(
                            "profile",
                            JSON.stringify(profile),
                        );
                        this.setState({ profile });
                    });
                }
            })
            .catch(error => {
                const errorCode = error.code;
                if (errorCode && errorCode === "auth/email-already-in-use") {
                    return alert(errorCode);
                }
            });
    };

    handleEmailAndPasswordLogin = (email, password) => {
        client()
            .auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                console.log("handleEmailAndPassword -> result", result);
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    };

    handleFacebookLogin = () => {
        client().auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    };

    handleGoogleLogin = isParent => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
        client()
            .auth.signInWithPopup(provider)
            .then(result => {
                if (result.additionalUserInfo.isNewUser) {
                    crud.createUserProfile(result.user, isParent).then(
                        profile => {
                            localStorage.setItem(
                                "profile",
                                JSON.stringify(profile),
                            );
                            this.setState({ profile });
                        },
                    );
                }
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                console.log("handleGoogleLogin -> errorCode", errorCode);
                var errorMessage = error.message;
                console.log("handleGoogleLogin -> errorMessage", errorMessage);
                // The email of the user's account used.
                var email = error.email;
                console.log("handleGoogleLogin -> email", email);
                if (email) {
                    alert("account already in use");
                }
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log("handleGoogleLogin -> credential", credential);
                // ...
            });
    };

    handleLogout = () => {
        client()
            .auth.signOut()
            .then(() => {
                // Sign-out successful.
                localStorage.removeItem("profile");
            })
            .catch(error => {
                console.log("handleLogout -> error", error);
                // An error happened.
            });
    };

    componentWillUnmount() {
        localStorage.removeItem("profile");
        if (this.state.removeProfileListener) {
            this.state.removeProfileListener();
        }
    }
}

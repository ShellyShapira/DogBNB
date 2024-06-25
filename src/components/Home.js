import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { UserContext } from "../App";
import { LogOut } from "./Config";

const provider = new GoogleAuthProvider();

function Home() {
    const { user, setUser } = useContext(UserContext);

    const handleLogOut = async () => {
        await LogOut();
        setUser(null);
    }

    const onSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;            
            const additionalInfo = getAdditionalUserInfo(result);
            
            setUser({user, isNewUser: additionalInfo.isNewUser});
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    if (user === null) {
        return (
            <button onClick={onSignIn}>Sign in with Google</button>  
        );
    }

    if (user.isNewUser === true) {
        return (
        <div>
            <Link to='reserved'>reserved</Link>
            <div />
            <Link to='volunteer'>volunteer</Link>
            <button onClick={handleLogOut}>Log out</button>
        </div>
        );
    }

    return (
        <div>
            Welcome back!
            <button onClick={handleLogOut}>Log out</button>
        </div>
    );
}

export default Home;
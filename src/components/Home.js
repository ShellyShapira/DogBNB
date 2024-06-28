import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { UserContext } from "../App";
import { LogOut } from "./Config";
import logo from '../images/logo.png'; 

const provider = new GoogleAuthProvider();

function Home() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

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
            
            setUser({ user, isNewUser: additionalInfo.isNewUser });
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

    useEffect(() => {
        if (user && !user.isNewUser) {
            navigate('/feed');
        }
    }, [user, navigate]);

    if (user === null) {
        return (
            <div style={{ backgroundColor: '#d3d3d3', minHeight: '100vh', textAlign: 'center', padding: '20px' }}>
                <img src={logo} alt="Company Logo" style={{ width: '150px' }} />
                <p style={{ fontSize: '26px' , textDecoration: 'underline'}}>Welcome to Dog BNB!</p>
                <p>On our website you can find a solution for your dog while you are in reserve</p>
                <p>And amazing dog-loving volunteers who will take care of your dog</p>
                <button onClick={onSignIn} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', width: '200px' }}>Sign in with Google</button> 
            </div> 
        );
    }

    if (user.isNewUser === true) {
        return (
        <div style={{ backgroundColor: '#d3d3d3', minHeight: '100vh', textAlign: 'center', padding: '20px' }}>
            <img src={logo} alt="Company Logo" style={{ width: '150px', marginBottom: '30px' }} />
            <Link to='reserved' style={{ display: 'block', margin: '10px 0' }}>reserved</Link>
            <div />
            <Link to='volunteer' style={{ display: 'block', margin: '10px 0' }}>volunteer</Link>
            <button onClick={handleLogOut} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', width: '200px' }}>Log out</button>
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
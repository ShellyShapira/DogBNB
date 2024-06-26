
import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useEffect, useState, createContext } from 'react';
import './App.css';
import Home from './components/Home';
import RegisterReserved from './components/RegisterReserved';
import RegisterVolunteer from './components/RegisterVolunteer';
import About from './components/About';
import DogProfiles from './components/DogProfiles';
import DogSitters from './components/DogSitters';
import ImageSection from './components/ImageSection';
import MyDogProfiles from './components/MyDogProfiles';
import MyVolunteerProfile from './components/MyVolunteerProfile';
import Requestdos from './components/Requestdos';
import RequestsMain from './components/RequestsMain';
import Requestsvs from './components/Requestsvs';
import VolunteerProfiles from './components/VolunteerProfiles';
import FormSection from './components/FormSection';
import { getAuth } from "firebase/auth";
import Feed from './components/Feed';
import MainLayout from './layouts/MainLayout';
import { InitializeFirebase } from './components/Config';

export const UserContext = createContext(null);

InitializeFirebase();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((firebaseUser) => {
      setIsLoading(false);
      if (!firebaseUser) {
        return;
      }
      setUser({ firebaseUser, isNewUser: false });
    });
  }, []);

  if (isLoading) {
    return (
      <div style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
        <img className='center' src="https://media.tenor.com/ivCA1wKA0WEAAAAi/pixel-pug-dog.gif" alt="Loading" />
      </div>
    );
  }

  const isLoggedIn = user != null;

  return (
    <div className="App">
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {isLoggedIn && (
              <>
                <Route path="feed" element={<MainLayout><Feed /></MainLayout>} />
                <Route path="about" element={<MainLayout><About /></MainLayout>} />
                <Route path="my-profile" element={<MainLayout><MyDogProfiles /></MainLayout>} />
                <Route path="requests" element={<MainLayout><RequestsMain /></MainLayout>} />
                <Route path="reserved" element={<MainLayout><RegisterReserved /></MainLayout>} />
                <Route path="volunteer" element={<MainLayout><RegisterVolunteer /></MainLayout>} />
                <Route path="DogProfiles" element={<MainLayout><DogProfiles /></MainLayout>} />
                <Route path="DogSitters" element={<MainLayout><DogSitters /></MainLayout>} />
                <Route path="FormSection" element={<MainLayout><FormSection /></MainLayout>} />
                <Route path="ImageSection" element={<MainLayout><ImageSection /></MainLayout>} />
                <Route path="MyVolunteerProfiles" element={<MainLayout><MyVolunteerProfile /></MainLayout>} />
                <Route path="Requestdos" element={<MainLayout><Requestdos /></MainLayout>} />
                <Route path="Requestsvs" element={<MainLayout><Requestsvs /></MainLayout>} />
                <Route path="VolunteerProfiles" element={<MainLayout><VolunteerProfiles /></MainLayout>} />
                <Route path="dog-profile/:id" element={<MainLayout><DogProfiles /></MainLayout>} />
                <Route path="volunteer-profile/:id" element={<MainLayout><VolunteerProfiles /></MainLayout>} />
              </>
            )}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
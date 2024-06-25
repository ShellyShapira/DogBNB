import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import RegisterReserved from './components/RegisterReserved';
import RegisterVolunteer from './components/RegisterVolunteer';
import About from './components/About';
import DogProfiles from './components/DogProfiles';
import DogSitters from './components/DogSitters';
import ImageSection from './components/ImageSection';
import MainDogProfiles from './components/MainDogProfiles';
import MainVolunteerProfiles from './components/MainVolunteerProfiles';
import MyDogProfiles from './components/MyDogProfiles';
import MyVolunteerProfile from './components/MainVolunteerProfiles';
import NavBar from './components/NavBar';
import ReportWebVitals from './components/ReportWebVitals';
import Requestdos from './components/Requestdos';
import RequestsMain from './components/RequestsMain';
import Requestsvs from './components/Requestsvs';
import VolunteerProfiles from './components/VolunteerProfiles';
import FormSection from './components/FormSection';
import { GetCurrentUser, InitializeFirebase } from './components/Config';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import Feed from './components/Feed';


export const UserContext = React.createContext(null);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  InitializeFirebase();

  const [user, setUser] = useState(null);

  useEffect(() => 
      getAuth().onAuthStateChanged((firebaseUser) => 
        {
          setIsLoading(false);
          if (!firebaseUser) {
            return;
          }
           
          setUser({firebaseUser, isNewUser: false});
        }
      )
  , []);

  if (isLoading) {
    return (
        <div style={{height: '100%', width: '100%', display: 'grid', placeItems: 'center'}}>
          <img className='center' src="https://media.tenor.com/ivCA1wKA0WEAAAAi/pixel-pug-dog.gif" alt="Loading"/>
      </div>
    );
  }
  const isLoggedIn = user != null;

  console.log({isLoggedIn: isLoggedIn});

  return (
    <div className="App">
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <Routes>
              <Route path="/" element={<Home />} />
              { 
                isLoggedIn ?
                [
                  <Route path="reserved" exact element={<RegisterReserved />} />,
                  <Route path="volunteer" exact element={<RegisterVolunteer />} />,
                  <Route path="about" exact element={<About />} />,
                  <Route path="DogProfiles" exact element={<DogProfiles />} />,
                  <Route path="DogSitters" exact element={<DogSitters />} />,
                  <Route path="Feed" exact element={<Feed />} />,
                  <Route path="FormSection" exact element={<FormSection />} />,
                  <Route path="ImageSection" exact element={<ImageSection />} />,
                  <Route path="MyDogProfiles" exact element={<MyDogProfiles />} />,
                  <Route path="MyVolunteerProfiles" exact element={<MyVolunteerProfile />} />,
                  <Route path="NavBar" exact element={<NavBar />} />,
                  <Route path="Requestdos" exact element={<Requestdos />} />,
                  <Route path="RequestsMain" exact element={<RequestsMain />} />,
                  <Route path="Requestsvs" exact element={<Requestsvs />} />,
                  <Route path="VolunteerProfiles" exact element={<VolunteerProfiles />} />


                ]
                :
                null
              }
              <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </UserContext.Provider>
    </div>
  );
}

export default App;

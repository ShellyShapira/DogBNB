import React, { useState, useEffect } from 'react';
import '../styles/VolunteerProfiles.css';

const profiles = [
  {
    id: 1,
    name: 'Sarah Cohen',
    age: 30,
    gender: 'Female',
    address: 'Herzliya',
    adoptions: 5,
    animalExperience: 'Yes',
    additionalAnimals: 'Yes',
    yard: 'Yes',
    children: 'No',
    availableDates: '15-30/09/2024',
    description: 'A professional with a flexible schedule. Loves all kinds of animals. Eager to volunteer and make a difference!',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    reviews: [
      { reviewer: 'Dave', date: 'April 2023', location: 'Herzliya', text: 'Sarah is very professional and caring. My dog loved her!' },
      { reviewer: 'Eve', date: 'March 2023', location: 'Tel Aviv', text: 'Sarah has a big heart for animals. Highly recommended!' },
      { reviewer: 'Frank', date: 'February 2023', location: 'Jerusalem', text: 'Great experience. Sarah is wonderful with pets.' },
      { reviewer: 'Grace', date: 'January 2023', location: 'Herzliya', text: 'Sarah was very attentive and loving towards my pets.' },
      { reviewer: 'Hank', date: 'December 2022', location: 'Tel Aviv', text: 'Excellent care by Sarah. Will definitely ask her again!' }
    ]
  },
  {
    id: 2,
    name: 'Michael Johnson',
    age: 35,
    gender: 'Male',
    address: 'Tel Aviv',
    adoptions: 3,
    animalExperience: 'Yes',
    additionalAnimals: 'No',
    yard: 'No',
    children: 'Yes',
    availableDates: '01-15/10/2024',
    description: 'An experienced volunteer with a love for dogs. Available for short-term fostering.',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61',
    reviews: [
      { reviewer: 'Alice', date: 'May 2023', location: 'Tel Aviv', text: 'Michael was fantastic! Highly recommend him.' },
      { reviewer: 'Bob', date: 'June 2023', location: 'Haifa', text: 'Great with pets and very reliable.' },
      { reviewer: 'Charlie', date: 'July 2023', location: 'Tel Aviv', text: 'My dog loved Michael. Will definitely contact him again.' }
    ]
  }
];

const getRandomProfile = () => profiles[Math.floor(Math.random() * profiles.length)];

const ProfileCard = ({ profile }) => {
  const defaultFemalePhoto = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1';
  const defaultMalePhoto = 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61';
  const photo = profile.gender === 'Female' ? (profile.photo || defaultFemalePhoto) : (profile.photo || defaultMalePhoto);

  return (
    <div className="container">
      <div className="header">
        <div className="profile-image">
          <img src={photo} alt={`${profile.name}'s Photo`} />
        </div>
        <div className="basic-info">
          <h1>Meet {profile.name.split(' ')[0]}</h1>
          <p>{profile.address}</p>
          <p>Age: {profile.age}</p>
        </div>
      </div>
      <div id={`details-${profile.id}`}>
        <div className="profile-info">
          <div className="column">
            <h2 className="center-text">Personal Details</h2>
            <div className="detail-row">
              <span className="detail-label"><strong>Name:</strong></span>
              <span className="detail-value">{profile.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Gender:</strong></span>
              <span className="detail-value">{profile.gender}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Address:</strong></span>
              <span className="detail-value">{profile.address}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Animal Experience:</strong></span>
              <span className="detail-value">{profile.animalExperience}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Additional Animals at Home:</strong></span>
              <span className="detail-value">{profile.additionalAnimals}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>A House with a Yard:</strong></span>
              <span className="detail-value">{profile.yard}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Children at Home:</strong></span>
              <span className="detail-value">{profile.children}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Dog Adoption Number:</strong></span>
              <span className="detail-value">{profile.adoptions}</span>
            </div>
          </div>
          <div className="column">
            <div className="description">
              <h2 className="center-text">A Little About Me</h2>
              <p>{profile.description}</p>
            </div>
          </div>
        </div>
        <div className="reviews">
          <h2 className="center-text">Reviews</h2>
          <div className="reviews-container">
            <div className="reviews-row">
              {profile.reviews.map((review, index) => (
                <div key={index} className="review">
                  <strong>{review.reviewer}</strong>
                  <span className="date-location">{review.date}, {review.location}</span>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VolunteerProfiles = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setProfile(getRandomProfile());
  }, []);

  return (
    <div>
      {profile && <ProfileCard profile={profile} />}
    </div>
  );
};

export default VolunteerProfiles;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/DogProfile.css';

const breeds = ['labrador', 'poodle', 'bulldog', 'beagle', 'pug', 'husky', 'goldenretriever', 'dachshund', 'rottweiler', 'chihuahua'];
const locations = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Eilat', 'Beer Sheva'];
const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Daniel', 'Emma', 'Michael', 'Olivia', 'David', 'Sophia'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];
const careInstructions = [
  'Feed twice a day with high-quality dog food. Provide clean, fresh water at all times. Ensure the dog has a comfortable place to sleep.',
  'Take for a walk at least once a day. Make sure the dog gets plenty of exercise and playtime. Regular grooming is necessary.',
  'Brush coat weekly to prevent matting. Check ears regularly for signs of infection. Trim nails monthly to avoid overgrowth.',
  'Regular vet check-ups every 6 months. Keep vaccinations up to date. Monitor for any signs of health issues and address them promptly.',
  'Ensure plenty of fresh water is available at all times. Provide a balanced diet. Avoid giving the dog human food, especially anything toxic.',
];

const suitableForOptions = [
  'apartment',
  'house with a yard',
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateDescription = (friendlyWithChildren, dogName) => {
  if (friendlyWithChildren === 'Yes') {
    return `${dogName} is a friendly dog that loves to play and enjoys spending time with family. ${dogName} is very loyal and makes a great companion.`;
  } else {
    return `${dogName} prefers a quieter environment and may not be suitable for homes with children. ${dogName} is very loyal and makes a great companion for adults.`;
  }
};

const generateDogProfiles = () => {
  return breeds.map((breed, index) => {
    const location = getRandomElement(locations);
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const dogName = getRandomElement(firstNames);
    const suitableFor = getRandomElement(suitableForOptions);
    const friendlyWithChildren = Math.random() > 0.5 ? 'Yes' : 'No';
    const description = generateDescription(friendlyWithChildren, dogName);
    return {
      id: index + 1,
      name: dogName,
      breed,
      age: `${Math.floor(Math.random() * 10) + 1} years`,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      size: getRandomElement(['small', 'medium', 'large']),
      immune: Math.random() > 0.5 ? 'Yes' : 'No',
      neutered: Math.random() > 0.5 ? 'Yes' : 'No',
      suitableFor,
      friendlyWithChildren,
      location,
      datesForBBsitting: `0${Math.floor(Math.random() * 9) + 1}/07-25/08/2024`,
      ownerName: `${firstName} ${lastName}`,
      mobile: `052-${Math.floor(Math.random() * 9000000) + 1000000}`,
      address: location,
      availability: 'only Whatsapp',
      description,
      careInstructions: getRandomElement(careInstructions),
    };
  });
};

const dogProfiles = generateDogProfiles();

const DogProfileCard = ({ profile }) => {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const fetchDogPhoto = async () => {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${profile.breed}/images/random`);
        setPhotoUrl(response.data.message);
      } catch (error) {
        console.error('Error fetching dog photo:', error);
        setPhotoUrl('https://default-photo-url-here.jpg'); 
      }
    };

    fetchDogPhoto();
  }, [profile.breed]);

  return (
    <div className="container">
      <div className="header">
        <div className="profile-image">
          <img src={photoUrl} alt={`${profile.name}'s Photo`} />
        </div>
        <div className="basic-info">
          <h1>Meet {profile.name}</h1>
          <p>{profile.breed}, {profile.age}, {profile.size}</p>
          <p>{profile.address}</p>
          <p>Dates for BBsitting: {profile.datesForBBsitting}</p>
        </div>
      </div>
      <div id={`details-${profile.id}`}>
        <div className="profile-info">
          <div className="left-column">
            <h2>Dog I.D</h2>
            <div className="detail-row">
              <span className="detail-label"><strong>Breed:</strong></span>
              <span className="detail-value">{profile.breed}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Age:</strong></span>
              <span className="detail-value">{profile.age}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Gender:</strong></span>
              <span className="detail-value">{profile.gender}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Size:</strong></span>
              <span className="detail-value">{profile.size}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Immune:</strong></span>
              <span className="detail-value">{profile.immune}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Neutered:</strong></span>
              <span className="detail-value">{profile.neutered}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Suitable For:</strong></span>
              <span className="detail-value">{profile.suitableFor}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Friendly with children:</strong></span>
              <span className="detail-value">{profile.friendlyWithChildren}</span>
            </div>
          </div>
          <div className="right-column">
            <h2>Owner I.D</h2>
            <div className="detail-row">
              <span className="detail-label"><strong>Name:</strong></span>
              <span className="detail-value">{profile.ownerName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Address:</strong></span>
              <span className="detail-value">{profile.address}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Availability:</strong></span>
              <span className="detail-value">{profile.availability}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Date Reserve:</strong></span>
              <span className="detail-value">{profile.datesForBBsitting}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><strong>Other:</strong></span>
              <span className="detail-value">N/A</span>
            </div>
          </div>
        </div>
        <div className="description-row">
          <div className="text-section">
            <h2>A Little About Me</h2>
            <p>{profile.description}</p>
          </div>
          <div className="text-section">
            <h2>Care Instructions</h2>
            <p>{profile.careInstructions}</p>
          </div>
        </div>
      </div>
      <button className="contact-button">Contact</button>
    </div>
  );
};

const DogProfiles = () => {
  const firstProfile = dogProfiles[0];
  return (
    <div>
      <DogProfileCard profile={firstProfile} />
    </div>
  );
};

export default DogProfiles;
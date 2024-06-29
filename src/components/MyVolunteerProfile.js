import React, { useState, useEffect } from 'react';
import '../styles/VolunteerProfiles.css';
import { DB, GetCurrentUser } from './Config';
import { doc, getDoc } from "firebase/firestore";

const ProfileCard = ({ profile }) => {
    const defaultPhoto = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1';
    const photo = profile.profilePic || defaultPhoto;

    return (
        <div className="container">
            <div className="header">
                <div className="profile-image">
                    <img src={photo} alt={`${profile.name}'s Photo`} />
                </div>
                <div className="basic-info">
                    <h1>My Profile</h1>
                    <h2>{profile.name.split(' ')[0]}</h2>
                    <p>{profile.address}</p>
                    <p>Age: {profile.age || 'N/A'}</p>
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
                            <span className="detail-value">{profile.gender || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label"><strong>Address:</strong></span>
                            <span className="detail-value">{profile.address}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label"><strong>Animal Experience:</strong></span>
                            <span className="detail-value">{profile.animalExperience || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label"><strong>Additional Animals at Home:</strong></span>
                            <span className="detail-value">{profile.additionalAnimals || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label"><strong>A House with a Yard:</strong></span>
                            <span className="detail-value">{profile.yard || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label"><strong>Children at Home:</strong></span>
                            <span className="detail-value">{profile.children || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label"><strong>Dog Adoption Number:</strong></span>
                            <span className="detail-value">{profile.adoptions || 'N/A'}</span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="description">
                            <h2 className="center-text">A Little About Me</h2>
                            <p>{profile.description || 'No description provided'}</p>
                        </div>
                    </div>
                </div>
                <div className="reviews">
                    <h2 className="center-text">Reviews</h2>
                    <div className="reviews-container">
                        <div className="reviews-row">
                            {profile.reviews && profile.reviews.map((review, index) => (
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
            <button className="edit-profile-button">Edit Profile</button>
        </div>
    );
};

const VolunteerProfiles = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const userDoc = await getDoc(doc(DB(), "volunteers", GetCurrentUser().uid));
            if (userDoc.exists()) {
                setProfile(userDoc.data());
            }
        };
        fetchProfile();
    }, []);

    return (
        <div>
            {profile ? <ProfileCard profile={profile} /> : <p>Loading...</p>}
        </div>
    );
};

export default VolunteerProfiles;

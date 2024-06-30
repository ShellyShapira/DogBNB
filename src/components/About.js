import React from 'react';
import '../styles/about.css';
import CustomRating from './CustomRating';
import dogBanner from '../images/dog-banner.png';
import dor from '../images/dor.png';
import itay from '../images/itay.png';
import trusted from '../images/trusted-community.png';
import seamless from '../images/seamless-coordination.png';
import personalized from '../images/personalized-care.png';
 

function main_about() {
  return (
    <div className="main_about">
      <div className="about-section">
        <div className="banner-container">
          <img src={dogBanner} alt="Dog BNB" className="banner-image" />
          <div className="banner-text">
            <h1>About DogBNB</h1>
          </div>
        </div>
        <div className="about-content">
          <p>
            Welcome to DogBNB, a platform supporting Israel’s reserved duty soldiers ("miluim") during challenging times.
            We connect these brave individuals with compassionate volunteers eager to care for their dogs.
          </p>
          <p>
            Our mission is to provide peace of mind to our soldiers, ensuring their beloved pets are in good hands while
            they are away. By fostering a community of support, we aim to alleviate some burdens on our soldiers, allowing
            them to focus on their duties, knowing their furry friends are safe and cared for.
          </p>
          <h2>Join us making a difference, one dog at a time!</h2>
        </div>
      </div>
      <div className="reviews-section">
        <div className="review">
          <img src={dor} alt="Dor, Golani unit" className="review-image" />
          <h3>Dor, Golani unit</h3>
          <p>
            “I recently had to go on miluim and was worried about my dog, Max. Thankfully, I found DogBNB, and connected with Shira.
            She took such great care of Max. It was wonderful to get updates and see him happy and well taken care of. I am incredibly
            grateful for her kindness and the platform for making this possible. Thank you!”
          </p>
        </div>
        <div className="review">
          <img src={itay} alt="Itay, Palsar and Nastya, volunteer" className="review-image" />
          <h3>Itay, Palsar Givati</h3>
          <p>
            “As a Palsar's soldeir in miluim, I was concerned about leaving my dog, Timothiy. I found DogBNB and connected with Nastya.
            She took great care of Timothiy and sent photos. It felt good to know my dog was in good hands. Thank you for making this
            possible.”
          </p>
        </div>
      </div>
      <div className="rating-section">
        <CustomRating /> {/* Add the CustomRating component here */}
      </div>
      <div className="how-it-works-section">
        <h2>Why it works</h2>
        <div className="how-it-works">
          <div className="feature">
            <img src={trusted} alt="Trusted Community" className="feature-image" />
            <h3>Trusted Community</h3>
            <p>Our platform connects soldiers with verified volunteers who are passionate about helping and have undergone thorough vetting processes.</p>
          </div>
          <div className="feature">
            <img src={seamless} alt="Seamless Coordination" className="feature-image" />
            <h3>Seamless Coordination</h3>
            <p>We provide an easy-to-use platform for scheduling and communication between soldiers and volunteers, ensuring smooth coordination.</p>
          </div>
          <div className="feature">
            <img src={personalized} alt="Personalized Care" className="feature-image" />
            <h3>Personalized Care</h3>
            <p>Volunteers offer personalized care tailored to the needs of each pet, providing peace of mind to soldiers while they serve.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default main_about;

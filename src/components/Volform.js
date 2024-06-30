import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dogProfile from '../images/dog_profile.png'; // Import the profile image
import styles from '../styles/FormSection.module.css';
import { DB, GetCurrentUser } from './Config';
import { setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from 'react-router-dom'; // Import Link

function VolFormSection() {
  const currentUser = GetCurrentUser();
  const [profilePic, setProfilePic] = useState('');
  const [formData, setFormData] = useState({
    name: currentUser.displayName,
    mobile: '',
    address: '',
    registrationType: "volunteer"
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profilePicFile = new FormData(event.target).get('profilePic');
    const storage = getStorage();
    const storageRef = ref(storage, `profile_pics/${currentUser.uid}`);

    await uploadBytes(storageRef, profilePicFile);
    const profilePicURL = await getDownloadURL(storageRef);

    const updatedFormData = {
      ...formData,
      profilePic: profilePicURL
    };

    // Ensure the document reference has an even number of segments (e.g., 'users/{uid}')
    await setDoc(doc(DB(), "volunteer", currentUser.uid), updatedFormData);
    navigate('/Volunteerprof'); // Redirect to the user's profile after submission
  };

  return (
    <div className={styles["form-section"]}>
      <h1>Thank you for your service,<br />some details about you:</h1>
      <p className={styles["intro"]}>Let's get started</p>
      <form id="signup-form" onSubmit={handleSubmit}>
        <div className={styles["profile-picture"]}>
          <label htmlFor="profilePic" className={styles["profile-pic-label"]}>
            <img src={profilePic || dogProfile} alt="Form section illustration" id="profilePicPreview" />
          </label>
          <input type="file" id="profilePic" name="profilePic" accept="image/*" style={{ display: 'none' }} onChange={previewImage} />
        </div>
        <input type="text" name="name" value={formData.name} placeholder="Enter your full name" required onChange={handleInputChange} />
        <input type="text" name="mobile" placeholder="Enter your phone number" required onChange={handleInputChange} />
        <input type="text" name="address" placeholder="Please enter your address" required onChange={handleInputChange} />
        <input type="hidden" name="registrationType" value="volunteer" />
        <button type="submit">Sign up</button>
      </form>

      <Link to='/volunteer'>Are you a volunteer? click here to sign up!</Link>
    </div>
  );
}

export default VolFormSection;

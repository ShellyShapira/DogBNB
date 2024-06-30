import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dogProfile from '../images/dog_profile.png'; // Import the profile image
import styles from '../styles/FormSection.module.css';
import { DB, GetCurrentUser } from './Config';
import { setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from 'react-router-dom'; // Import Link

function FormSection() {
  const currentUser = GetCurrentUser();
  const [profilePic, setProfilePic] = useState('');
  const [formData, setFormData] = useState({
    name: currentUser.displayName,
    mobile: '',
    address: '',
    dogType: '',
    dogAge: '',
    dogGender: '',
    dogSize: '',
    dogImmune: '',
    dogNeutered: '',
    suitableFor: [],
    dogDetails: '',
    registrationType: "reserve"
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    let suitableFor = [...formData.suitableFor];
    if (event.target.checked) {
      suitableFor.push(value);
    } else {
      suitableFor = suitableFor.filter(item => item !== value);
    }
    setFormData(prev => ({ ...prev, [name]: suitableFor }));
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

    await setDoc(doc(DB(), "reserved", currentUser.uid), updatedFormData);
    navigate('/mydogprofile'); // Redirect to the user's dog profiles after submission
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
        <input type="text" name="dogType" placeholder="Please name your dog type" required onChange={handleInputChange} />
        <input type="text" name="dogAge" placeholder="Please enter your dog age" required onChange={handleInputChange} />
        <select name="dogGender" required onChange={handleInputChange}>
          <option value="">What is your dog gender?</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <select name="dogSize" required onChange={handleInputChange}>
          <option value="">What is your dog size?</option>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
        <select name="dogImmune" required onChange={handleInputChange}>
          <option value="">Is your dog immune?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <select name="dogNeutered" required onChange={handleInputChange}>
          <option value="">Is your dog neutered?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <div className={`${styles["input-group"]} ${styles["checkbox-group"]}`}>
          <p>The dog is suitable for:</p>
          <label htmlFor="suitableChildren"><input type="checkbox" id="suitableChildren" name="suitableFor" value="children" onChange={handleCheckboxChange} /> Children</label>
          <label htmlFor="suitableYard"><input type="checkbox" id="suitableYard" name="suitableFor" value="house with yard" onChange={handleCheckboxChange} /> House with yard</label>
          <label htmlFor="suitableAllergens"><input type="checkbox" id="suitableAllergens" name="suitableFor" value="allergens" onChange={handleCheckboxChange} /> Allergens</label>
        </div>
        <input type="text" name="dogDetails" placeholder="Enter details that are important to know about your dog" required onChange={handleInputChange} />
        <input type="hidden" name="registrationType" value="reserve" />
        <button type="submit">Sign up</button>
      </form>

      <Link to='/volunteer'>Are you a volunteer? click here to sign up!</Link>
    </div>
  );
}

export default FormSection;

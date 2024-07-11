import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import { UserContext } from '../App';
import pawPrint from '../images/pawprint5.svg';

const GlobalStyle = createGlobalStyle`
  :root {
    --TITLE_FONT: 'Source Serif Pro', serif;
    --TEXT_FONT: Arial, sans-serif;
    --TITLE_COLOR_H1: #4C7572;
    --BACKGROUND_COLOR: #F0EDEB;
    --TEXT_COLOR_H1: #46454A;
    --BUTTON_COLOR_H1: #628991;
  }

  body {
    font-family: var(--TEXT_FONT);
    direction: ltr;
    margin: 0;
    padding: 0;
    background-color: var(--BACKGROUND_COLOR);
    color: var(--TEXT_COLOR_H1);
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  text-align: left;
  background: var(--BACKGROUND_COLOR);
`;

const ProfileSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Section = styled.div`
  flex: 1;
  margin: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #CBD5D0;
  box-shadow: none;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-left: 20px;
`;

const BasicInfo = styled.div`
  text-align: left;
  flex-grow: 1;
`;

const VolunteerName = styled.h2`
  font-family: arial;
  font-size: 3rem;
  margin: 5px 0;
  color: #555;
`;

const SubTitle = styled.h2`
  font-family: var(--TEXT_FONT);
  font-size: 1.5rem;
  margin: 5px 0;
  color: #555;
`;

const Text = styled.p`
  font-family: var(--TEXT_FONT);
  font-size: 1.2rem;
  margin: 5px 0;
  color: var(--TEXT_COLOR_H1);
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  border: 1px solid #ddd;
  width: 100%;
`;

const DetailRow = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const DetailLabel = styled.label`
  font-weight: bold;
  color: #333;
`;

const DetailValue = styled.span`
  align: left;
  display: flex;
  color: #666;
`;

const EditButton = styled.button`
  background-color: #628991;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: box-shadow 0.3s ease-in-out;
  display: inline-block;
  width: auto;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
    background-color: #628991;
  }
`;

const TitleSection = styled.div`
  background-color: #DCE2E4;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  margin: -20px -20px 20px -20px;
`;

const TitleWithIcon = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
`;

const ReviewsContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
`;

const ReviewCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
`;

const RequestItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const Info = styled.div`
  flex-grow: 1;
`;

const Name = styled.div`
  font-weight: bold;
  cursor: pointer;
`;

const Date = styled.div`
  color: grey;
`;

const PhoneButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #25D366;
  color: white;
  padding: 5px;
  border-radius: 50%;
  text-decoration: none;
  text-align: center;
  transition: box-shadow 0.3s ease-in-out;
  width: 40px;
  height: 40px;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
  }

  svg {
    font-size: 20px;
  }
`;

const RequestDOS = ({ requests }) => {
  const navigate = useNavigate();

  const handleNameClick = (id) => {
    navigate(`/volunteer-profile/${id}`);
  };

  return (
    <Card>
      <TitleSection>
        <TitleWithIcon>
          <img src={pawPrint} alt="Paw Print" />
          <SubTitle>Approved Requests</SubTitle>
        </TitleWithIcon>
      </TitleSection>
      {requests.map((request) => (
        <RequestItem key={request.id}>
          <Avatar src={request.avatar} alt={request.name} />
          <Info>
            <Name onClick={() => handleNameClick(request.id)}>{request.name}</Name>
            <Date>{request.date}</Date>
          </Info>
          <PhoneButton href={`https://wa.me/${request.phone}`} target="_blank">
            <FaWhatsapp />
          </PhoneButton>
        </RequestItem>
      ))}
    </Card>
  );
};

const PersonalDetails = ({ profile, isEditing, formData, handleChange }) => (
  <Card>
    <TitleSection>
      <TitleWithIcon>
        <img src={pawPrint} alt="Paw Print" />
        <SubTitle>Personal Details</SubTitle>
      </TitleWithIcon>
    </TitleSection>
    {isEditing ? (
      <>
        <DetailRow>
          <DetailLabel><strong>Name:</strong></DetailLabel>
          <input className="detail-value" name="name" value={formData.name} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Address:</strong></DetailLabel>
          <input className="detail-value" name="address" value={formData.address} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Age:</strong></DetailLabel>
          <input className="detail-value" name="age" value={formData.age} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Gender:</strong></DetailLabel>
          <div>
            <label>
              <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
              Female
            </label>
          </div>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Number of Adoptions:</strong></DetailLabel>
          <input className="detail-value" name="numberOfAdoptions" value={formData.numberOfAdoptions} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Animal Experience:</strong></DetailLabel>
          <div>
            <label>
              <input type="radio" name="animalExperience" value="Yes" checked={formData.animalExperience === 'Yes'} onChange={handleChange} />
              Yes
            </label>
            <label>
              <input type="radio" name="animalExperience" value="No" checked={formData.animalExperience === 'No'} onChange={handleChange} />
              No
            </label>
          </div>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Additional Animals At Home:</strong></DetailLabel>
          <div>
            <label>
              <input type="radio" name="additionalAnimalsAtHome" value="Yes" checked={formData.additionalAnimalsAtHome === 'Yes'} onChange={handleChange} />
              Yes
            </label>
            <label>
              <input type="radio" name="additionalAnimalsAtHome" value="No" checked={formData.additionalAnimalsAtHome === 'No'} onChange={handleChange} />
              No
            </label>
          </div>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>A House with a Yard:</strong></DetailLabel>
          <div>
            <label>
              <input type="radio" name="yard" value="Yes" checked={formData.yard === 'Yes'} onChange={handleChange} />
              Yes
            </label>
            <label>
              <input type="radio" name="yard" value="No" checked={formData.yard === 'No'} onChange={handleChange} />
              No
            </label>
          </div>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Children at Home:</strong></DetailLabel>
          <div>
            <label>
              <input type="radio" name="childrenAtHome" value="Yes" checked={formData.childrenAtHome === 'Yes'} onChange={handleChange} />
              Yes
            </label>
            <label>
              <input type="radio" name="childrenAtHome" value="No" checked={formData.childrenAtHome === 'No'} onChange={handleChange} />
              No
            </label>
          </div>
        </DetailRow>
      </>
    ) : (
      <>
        <DetailRow>
          <DetailLabel><strong>Name:</strong></DetailLabel>
          <DetailValue>{profile.name}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Address:</strong></DetailLabel>
          <DetailValue>{profile.address}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Age:</strong></DetailLabel>
          <DetailValue>{profile.age}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Gender:</strong></DetailLabel>
          <DetailValue>{profile.gender}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Number of Adoptions:</strong></DetailLabel>
          <DetailValue>{profile.numberOfAdoptions}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Animal Experience:</strong></DetailLabel>
          <DetailValue>{profile.animalExperience}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Additional Animals At Home:</strong></DetailLabel>
          <DetailValue>{profile.additionalAnimalsAtHome}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>A House with a Yard:</strong></DetailLabel>
          <DetailValue>{profile.yard}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Children at Home:</strong></DetailLabel>
          <DetailValue>{profile.childrenAtHome}</DetailValue>
        </DetailRow>
      </>
    )}
  </Card>
);

const AboutMe = ({ profile, isEditing, formData, handleChange }) => (
  <Card>
    <TitleSection>
      <TitleWithIcon>
        <img src={pawPrint} alt="Paw Print" />
        <SubTitle>A Little About Me</SubTitle>
      </TitleWithIcon>
    </TitleSection>
    {isEditing ? (
      <textarea
        className="detail-value"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
      />
    ) : (
      <Text>{profile.description}</Text>
    )}
  </Card>
);

const Reviews = ({ profile }) => (
  <Card>
    <TitleSection>
      <TitleWithIcon>
        <img src={pawPrint} alt="Paw Print" />
        <SubTitle>Reviews</SubTitle>
      </TitleWithIcon>
    </TitleSection>
    <ReviewsContainer>
      {profile.reviews && profile.reviews.length > 0 ? (
        profile.reviews.map((review, index) => (
          <ReviewCard key={index}>
            <DetailLabel><strong>{review.reviewer}:</strong></DetailLabel>
            <DetailValue>{review.date}, {review.location}</DetailValue>
            <Text>{review.text}</Text>
          </ReviewCard>
        ))
      ) : (
        <Text>No reviews available</Text>
      )}
    </ReviewsContainer>
  </Card>
);

const VolProfileCard = ({ profile, onSave, requests }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    await onSave(formData); // Save the updated profile data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container>
      <GlobalStyle />
      <Header>
        <BasicInfo>
          <VolunteerName>{formData.name}</VolunteerName>
          <Text>{formData.address}</Text>
        </BasicInfo>
        <ProfileImage src={formData.profilePic} alt={`${profile.name}`} />
      </Header>
      <ProfileSectionWrapper>
        <Section>
          <PersonalDetails profile={profile} isEditing={isEditing} formData={formData} handleChange={handleChange} />
          <AboutMe profile={profile} isEditing={isEditing} formData={formData} handleChange={handleChange} />
          {isEditing ? (
            <EditButton onClick={handleSaveClick}>Save Profile</EditButton>
          ) : (
            <EditButton onClick={handleEditClick}>Edit Profile</EditButton>
          )}
        </Section>
        <Section>
          <Reviews profile={profile} />
          <RequestDOS requests={requests} />
        </Section>
      </ProfileSectionWrapper>
    </Container>
  );
};

const VolProfile = () => {
  const { user, updateUserDetails } = useContext(UserContext);
  const [requests, setRequests] = useState([
    { id: 1, name: 'Rina Cohen', date: '12/03/24 - 11/04/2024', phone: '0555555555', avatar: '../images/dog1.jpg' },
    { id: 2, name: 'Elad Farber', date: '12/03/24 - 11/04/2024', phone: '0555555555', avatar: '../images/dog2.jpg' },
    { id: 3, name: 'Miki Shapira', date: '12/03/24 - 11/04/2024', phone: '0555555555', avatar: '../images/dog3.jpg' },
  ]);

  // הוספת ביקורות דמה לפרופיל
  const dummyProfile = {
    ...user.details,
    reviews: [
      {
        reviewer: 'Alice',
        date: '2023-01-01',
        location: 'New York',
        text: 'Great volunteer! Very reliable and kind.'
      },
      {
        reviewer: 'Bob',
        date: '2023-02-15',
        location: 'Los Angeles',
        text: 'Took excellent care of the animals.'
      },
      {
        reviewer: 'Charlie',
        date: '2023-03-10',
        location: 'Chicago',
        text: 'Would definitely recommend!'
      }
    ]
  };

  return (
    <div>
      <VolProfileCard
        profile={dummyProfile}
        onSave={updateUserDetails}
        requests={requests}
      />
    </div>
  );
};

export default VolProfile;

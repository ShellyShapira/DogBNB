import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import styled, { createGlobalStyle } from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import { UserContext } from '../App';

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
  background-color: #DCE2E4;
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
  font-size: 3rem; /* גודל כפול */
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

const CollapsibleTrigger = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: '▼';
    font-size: 1rem;
    margin-left: 10px;
  }

  &:hover {
    background-color: #d5d5d5;
  }
`;

const TitleSection = styled.div`
  background-color: #DCE2E4;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  margin: -20px -20px 20px -20px; /* Adjust based on the card's padding */
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
  background-color: #25D366; /* WhatsApp green */
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
        <SubTitle>Approved Requests</SubTitle>
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
      <SubTitle>Personal Details</SubTitle>
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
          <input className="detail-value" name="gender" value={formData.gender} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Number of Adoptions:</strong></DetailLabel>
          <input className="detail-value" name="numberOfAdoptions" value={formData.numberOfAdoptions} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Animal Experience (Y/M):</strong></DetailLabel>
          <input className="detail-value" name="animalExperience" value={formData.animalExperience} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Additional Animals At Home:</strong></DetailLabel>
          <input className="detail-value" name="additionalAnimalsAtHome" value={formData.additionalAnimals} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>A House with a Yard: (Y/M):</strong></DetailLabel>
          <input className="detail-value" name="yard" value={formData.yard} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Children at Home (Y/M):</strong></DetailLabel>
          <input className="detail-value" name="childrenAtHome" value={formData.childrenAtHome} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Available Dates:</strong></DetailLabel>
          <input className="detail-value" name="availableDates" value={formData.availableDates} onChange={handleChange} />
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Description:</strong></DetailLabel>
          <textarea className="detail-value" name="description" value={formData.description} onChange={handleChange} rows="4" />
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
          <DetailLabel><strong>Animal Experience (Y/M):</strong></DetailLabel>
          <DetailValue>{profile.animalExperience}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Additional Animals At Home:</strong></DetailLabel>
          <DetailValue>{profile.additionalAnimalsAtHome}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>A House with a Yard: (Y/M):</strong></DetailLabel>
          <DetailValue>{profile.yard}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Children at Home (Y/M):</strong></DetailLabel>
          <DetailValue>{profile.childrenAtHome}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Available Dates:</strong></DetailLabel>
          <DetailValue>{profile.availableDates}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel><strong>Description:</strong></DetailLabel>
          <DetailValue>{profile.description}</DetailValue>
        </DetailRow>
      </>
    )}
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
          <Collapsible trigger={<CollapsibleTrigger>A Little About Me</CollapsibleTrigger>}>
            <Card>
              {isEditing ? (
                <>
                  <textarea
                    className="detail-value"
                    name="dogDetails"
                    value={formData.dogDetails}
                    onChange={handleChange}
                    rows="4"
                  />
                </>
              ) : (
                <Text>{profile.dogDetails}</Text>
              )}
            </Card>
          </Collapsible>
          <Collapsible trigger={<CollapsibleTrigger>Reviews</CollapsibleTrigger>}>
            <Card>
              {isEditing ? (
                <>
                  <DetailRow>
                    <DetailLabel><strong>Review 1:</strong></DetailLabel>
                    <textarea className="detail-value" name="review1" value={formData.review1} onChange={handleChange} rows="4" />
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel><strong>Review 2:</strong></DetailLabel>
                    <textarea className="detail-value" name="review2" value={formData.review2} onChange={handleChange} rows="4" />
                  </DetailRow>
                  {/* Add more reviews as needed */}
                </>
              ) : (
                <>
                  <DetailRow>
                    <DetailLabel><strong>Review 1:</strong></DetailLabel>
                    <DetailValue>{profile.review1}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel><strong>Review 2:</strong></DetailLabel>
                    <DetailValue>{profile.review2}</DetailValue>
                  </DetailRow>
                  {/* Display more reviews as needed */}
                </>
              )}
            </Card>
          </Collapsible>
          {isEditing ? (
            <EditButton onClick={handleSaveClick}>Save Profile</EditButton>
          ) : (
            <EditButton onClick={handleEditClick}>Edit Profile</EditButton>
          )}
        </Section>
        <Section>
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

  return (
    <div>
      <VolProfileCard
        profile={user.details}
        onSave={updateUserDetails}
        requests={requests}
      />
    </div>
  );
};

export default VolProfile;

import React, { useState, useContext } from 'react';
import Collapsible from 'react-collapsible';
import styled, { createGlobalStyle } from 'styled-components';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

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
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  text-align: left;
  background: var(--BACKGROUND_COLOR);
`;

const ProfileSection = styled.div`
  flex: 1;
  margin-right: 20px;
  margin-top: 20px; /* Adjust this value to align with the right section */
`;

const ActionsSection = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #DCE2E4;
  border-radius: 10px;
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

const SubTitle = styled.h2`
  font-family: var(--TEXT_FONT);
  font-size: 1.5rem;
  margin: 5px 0;
  color: #555;
`;

const Text = styled.p`
  font-family: var(--TEXT_FONT);
  font-size: 1rem;
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

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#91B6A2' : '#B05D5D'};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.primary ? '#8BBBAA' : '#B05D5D'};
  }
`;

const TitleSection = styled.div`
  background-color: #DCE2E4;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  margin: -20px -20px 20px -20px; /* Adjust based on the card's padding */
`;

const RequestActions = ({ requests, onAccept, onDelete }) => {
  const navigate = useNavigate();

  const handleNameClick = (id) => {
    navigate(`/volunteer-profile/${id}`);
  };

  return (
    <Card>
      <TitleSection>
        <SubTitle>Requests</SubTitle>
      </TitleSection>
      {requests.map((request, index) => (
        <RequestItem key={index}>
          <Avatar src={request.avatar} alt={request.name} />
          <Info>
            <Name onClick={() => handleNameClick(request.id)}>{request.name}</Name>
            <Date>{request.date}</Date>
          </Info>
          <ActionButtons>
            <Button primary onClick={() => onAccept(index)}>Accept</Button>
            <Button onClick={() => onDelete(index)}>Delete</Button>
          </ActionButtons>
        </RequestItem>
      ))}
    </Card>
  );
};

const DogSitters = ({ sitters, onDelete }) => {
  return (
    <Card>
      <TitleSection>
        <SubTitle>My Dog Sitters</SubTitle>
      </TitleSection>
      {sitters.map((sitter, index) => (
        <RequestItem key={index}>
          <Avatar src={sitter.avatar} alt={sitter.name} />
          <Info>
            <Name>{sitter.name}</Name>
            <Date>{sitter.date}</Date>
          </Info>
          <ActionButtons>
            <Button onClick={() => onDelete(index)}>Delete</Button>
          </ActionButtons>
        </RequestItem>
      ))}
    </Card>
  );
};

const DogProfileCard = ({ profile, onSave, requests, sitters, onRequestAccept, onRequestDelete, onSitterDelete }) => {
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

  // Removing extra commas from the address
  const formattedAddress = formData.address.replace(/,+/g, ',').replace(/^,|,$/g, '').trim();

  return (
    <Container>
      <GlobalStyle />
      <ProfileSection>
        <ProfileHeader>
          <BasicInfo>
            <SubTitle>{formData.name}</SubTitle>
            <Text>{formData.dogName}</Text>
            <Text>{formData.dogType}, {formData.dogAge}, {formData.dogSize}</Text>
            <Text>{formattedAddress}</Text>
          </BasicInfo>
          <ProfileImage src={formData.profilePic} alt={`${profile.name}`} />
        </ProfileHeader>

        <Collapsible trigger={<CollapsibleTrigger>Dog I.D</CollapsibleTrigger>}>
          <Card>
            {isEditing ? (
              <>
                <DetailRow>
                  <DetailLabel><strong>Name:</strong></DetailLabel>
                  <input className="detail-value" name="dogName" value={formData.dogName} onChange={handleChange} />
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Breed:</strong></DetailLabel>
                  <input className="detail-value" name="dogType" value={formData.dogType} onChange={handleChange} />
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Age:</strong></DetailLabel>
                  <input className="detail-value" name="dogAge" value={formData.dogAge} onChange={handleChange} />
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Gender (Male/Female):</strong></DetailLabel>
                  <input className="detail-value" name="dogGender" value={formData.dogGender} onChange={handleChange} />
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Size:</strong></DetailLabel>
                  <input className="detail-value" name="dogSize" value={formData.dogSize} onChange={handleChange} />
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Immune (Y/N):</strong></DetailLabel>
                  <input className="detail-value" name="dogImmune" value={formData.dogImmune} onChange={handleChange} />
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Neutered (Y/N):</strong></DetailLabel>
                  <input className="detail-value" name="dogNeutered" value={formData.dogNeutered} onChange={handleChange} />
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Suitable For:</strong></DetailLabel>
                  <input className="detail-value" name="suitableFor" value={formData.suitableFor} onChange={handleChange} />
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Friendly with children(Y/N):</strong></DetailLabel>
                  <input className="detail-value" name="friendlyWithChildren" value={formData.friendlyWithChildren} onChange={handleChange} />
                </DetailRow>
              </>
            ) : (
              <>
                <DetailRow>
                  <DetailLabel><strong>Name:</strong></DetailLabel>
                  <DetailValue>{formData.dogName}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Breed:</strong></DetailLabel>
                  <DetailValue>{formData.dogType}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Age:</strong></DetailLabel>
                  <DetailValue>{formData.dogAge}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Gender (Male/Female):</strong></DetailLabel>
                  <DetailValue>{formData.dogGender}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Size:</strong></DetailLabel>
                  <DetailValue>{formData.dogSize}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Immune (Y/N):</strong></DetailLabel>
                  <DetailValue>{formData.dogImmune}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Neutered (Y/N):</strong></DetailLabel>
                  <DetailValue>{formData.dogNeutered}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Suitable For:</strong></DetailLabel>
                  <DetailValue>{formData.suitableFor ? formData.suitableFor.join(', ') : 'N/A'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Friendly with children (Y/N):</strong></DetailLabel>
                  <DetailValue>{formData.friendlyWithChildren}</DetailValue>
                </DetailRow>
              </>
            )}
          </Card>
        </Collapsible>

        <Collapsible trigger={<CollapsibleTrigger>Owner I.D</CollapsibleTrigger>}>
          <Card>
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
              </>
            ) : (
              <>
                <DetailRow>
                  <DetailLabel><strong>Name:</strong></DetailLabel>
                  <DetailValue>{formData.name}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel><strong>Address:</strong></DetailLabel>
                  <DetailValue>{formattedAddress}</DetailValue>
                </DetailRow>
              </>
            )}
          </Card>
        </Collapsible>

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
              <Text>{formData.dogDetails}</Text>
            )}
          </Card>
        </Collapsible>

        <Collapsible trigger={<CollapsibleTrigger>Care Instructions</CollapsibleTrigger>}>
          <Card>
            {isEditing ? (
              <>
                <textarea
                  className="detail-value"
                  name="careInstructions"
                  value={formData.careInstructions}
                  onChange={handleChange}
                  rows="4"
                />
              </>
            ) : (
              <Text>{formData.careInstructions}</Text>
            )}
          </Card>
        </Collapsible>

        {isEditing ? (
          <EditButton onClick={handleSaveClick}>Save Profile</EditButton>
        ) : (
          <EditButton onClick={handleEditClick}>Edit Profile</EditButton>
        )}
      </ProfileSection>

      <ActionsSection>
        <RequestActions
          requests={requests}
          onAccept={onRequestAccept}
          onDelete={onRequestDelete}
        />

        <DogSitters
          sitters={sitters}
          onDelete={onSitterDelete}
        />
      </ActionsSection>
    </Container>
  );
};

const MyProfile = () => {
  const { user, updateUserDetails } = useContext(UserContext);
  const [requests, setRequests] = useState([
    { id: 1, name: 'John Doe', date: '2023-07-07', avatar: '../images/person3.jpg' },
    { id: 2, name: 'Jane Smith', date: '2023-07-06', avatar: '../images/person3.jpg' },
  ]);

  const [sitters, setSitters] = useState([
    { id: 1, name: 'Emily Clark', date: '2023-07-05', avatar: '../images/person2.jpg' },
    { id: 2, name: 'Michael Johnson', date: '2023-07-04', avatar: '../images/person1.jpg' },
  ]);

  const handleRequestAccept = (index) => {
    const acceptedRequest = requests[index];
    setSitters([...sitters, acceptedRequest]);
    setRequests(requests.filter((_, i) => i !== index));
    // TODO: Add backend code to notify the volunteer of acceptance
  };

  const handleRequestDelete = (index) => {
    setRequests(requests.filter((_, i) => i !== index));
    // TODO: Add backend code to delete the request
  };

  const handleSitterDelete = (index) => {
    setSitters(sitters.filter((_, i) => i !== index));
    // TODO: Add backend code to delete the sitter
  };

  return (
    <div>
      <DogProfileCard
        profile={user.details}
        onSave={updateUserDetails}
        requests={requests}
        sitters={sitters}
        onRequestAccept={handleRequestAccept}
        onRequestDelete={handleRequestDelete}
        onSitterDelete={handleSitterDelete}
      />
    </div>
  );
};

export default MyProfile;

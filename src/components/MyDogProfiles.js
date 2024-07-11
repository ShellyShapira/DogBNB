import React, { useState, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
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
  position: relative;
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
  z-index: 2;
`;

const BasicInfo = styled.div`
  text-align: left;
  flex-grow: 1;
`;

const VolunteerName = styled.h2`
  font-family: arial;
  font-size: 4rem;
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
  display: flex;
  align-items: center;
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
  background-color: ${props => props.primary ? '#628991' : '#B05D5D'};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.primary ? '#628991' : '#B05D5D'};
  }
`;

const PawPrint = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 1;
`;

const GalleryCard = styled(Card)`
  width: 100%;
`;

const UploadButton = styled.button`
  background-color: #628991;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  transition: box-shadow 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
  }
`;


const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  z-index: 1000;
`;

const CloseButton = styled.button`
  background-color: #B05D5D;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: #A04B4B;
  }
`;

const RequestActions = ({ requests, onAccept, onDelete }) => {
  const navigate = useNavigate();

  const handleNameClick = (id) => {
    navigate(`/volunteer-profile/${id}`);
  };

  return (
    <Card>
      <TitleSection>
        <TitleWithIcon>
          <img src={pawPrint} alt="Paw Print" />
          <SubTitle>Requests</SubTitle>
        </TitleWithIcon>
      </TitleSection>
      {requests.map((request, index) => (
        <RequestItem key={index}>
          <Avatar src={request.avatar} alt={request.name} />
          <Info>
            <Name onClick={() => handleNameClick(request.id)}>{request.name}</Name>
            <Date>{request.date}</Date>
          </Info>
          <ActionButtons>
            <Button onClick={() => onDelete(index)}>Delete</Button>
            <Button primary onClick={() => onAccept(index)}>Accept</Button>
          </ActionButtons>
        </RequestItem>
      ))}
    </Card>
  );
};

const DogSitters = ({ sitters, onDelete, onAddReview }) => {
  const [reviewIndex, setReviewIndex] = useState(null);
  const [reviewText, setReviewText] = useState('');

  const handleAddReview = (index) => {
    setReviewIndex(index);
  };

  const handleSaveReview = () => {
    onAddReview(reviewIndex, reviewText);
    setReviewIndex(null);
    setReviewText('');
  };

  const handleCloseReview = () => {
    setReviewIndex(null);
    setReviewText('');
  };

  return (
    <Card>
      <TitleSection>
        <TitleWithIcon>
          <img src={pawPrint} alt="Paw Print" />
          <SubTitle>My Dog Sitters</SubTitle>
        </TitleWithIcon>
      </TitleSection>
      {sitters.map((sitter, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <RequestItem>
            <Avatar src={sitter.avatar} alt={sitter.name} />
            <Info>
              <Name>{sitter.name}</Name>
              <Date>{sitter.date}</Date>
            </Info>
            <ActionButtons>
              <Button onClick={() => onDelete(index)}>Delete</Button>
              <Button primary onClick={() => handleAddReview(index)}>Add Review</Button>
            </ActionButtons>
          </RequestItem>
          {reviewIndex === index && (
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                onClick={handleCloseReview}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  color: '#B05D5D',
                }}
              >
                ×
              </button>
              <textarea
                rows="4"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                style={{ width: 'calc(100% - 20px)', margin: '10px 10px 0 10px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginLeft: '10px', marginRight: '10px' }}>
                <Button style={{ backgroundColor: 'blue' }} onClick={handleSaveReview}>Save</Button>
              </div>
            </div>
          )}
        </div>
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
      </>
    )}
    <DetailRow>
      <DetailLabel><strong>Dog I.D</strong></DetailLabel>
    </DetailRow>
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
            <select name="dogGender" value={formData.dogGender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Size:</strong></DetailLabel>
            <select name="dogSize" value={formData.dogSize} onChange={handleChange}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Immune (Y/N):</strong></DetailLabel>
            <select name="dogImmune" value={formData.dogImmune} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Neutered (Y/N):</strong></DetailLabel>
            <select name="dogNeutered" value={formData.dogNeutered} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Suitable For:</strong></DetailLabel>
            <select name="suitableFor" value={formData.suitableFor} onChange={handleChange}>
              <option value="Apartment">Apartment</option>
              <option value="House with yard">House with yard</option>
            </select>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Friendly with children(Y/N):</strong></DetailLabel>
            <select name="friendlyWithChildren" value={formData.friendlyWithChildren} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
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
            <DetailValue>{formData.suitableFor}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Friendly with children(Y/N):</strong></DetailLabel>
            <DetailValue>{formData.friendlyWithChildren}</DetailValue>
          </DetailRow>
        </>
      )}
    </Card>
    <DetailRow>
      <DetailLabel><strong>A Little About Me</strong></DetailLabel>
    </DetailRow>
    <Card>
      {isEditing ? (
        <>
          <textarea
            className="detail-value"
            name="dogDetails"
            value={formData.dogDetails}
            onChange={handleChange}
            rows="4"
            style={{ width: '100%' }}
          />
        </>
      ) : (
        <Text>{profile.dogDetails}</Text>
      )}
    </Card>
    <DetailRow>
      <DetailLabel><strong>Care Instructions</strong></DetailLabel>
    </DetailRow>
    <Card>
      {isEditing ? (
        <>
          <textarea
            className="detail-value"
            name="careInstructions"
            value={formData.careInstructions}
            onChange={handleChange}
            rows="4"
            style={{ width: '100%' }}
          />
        </>
      ) : (
        <Text>{profile.careInstructions}</Text>
      )}
    </Card>
  </Card>
);

const Gallery = ({ images, onUpload }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <GalleryCard>
      <TitleSection>
        <SubTitle>Gallery</SubTitle>
      </TitleSection>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <UploadButton onClick={() => document.getElementById('imageUpload').click()}>
          +
        </UploadButton>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`gallery-${index}`} style={{ width: '150px', height: '150px', margin: '10px', borderRadius: '10px' }} />
        ))}
      </div>
      <input
        type="file"
        id="imageUpload"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
    </GalleryCard>
  );
};


const DogProfileCard = ({ profile, onSave, requests, sitters, onRequestAccept, onRequestDelete, onSitterDelete, onAddReview, galleryImages, onImageUpload }) => {
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
      <Header>
        <BasicInfo>
          <VolunteerName>{formData.name}</VolunteerName>
          <Text>{formData.dogName}</Text>
          <Text>{[formData.dogType, formData.dogAge, formData.dogSize].filter(Boolean).join(', ')}</Text>
          <Text>{formattedAddress}</Text>
        </BasicInfo>
        <ProfileImage src={formData.profilePic} alt={`${profile.name}`} />
      </Header>
      <ProfileSectionWrapper>
        <Section>
          <PersonalDetails profile={profile} isEditing={isEditing} formData={formData} handleChange={handleChange} />
          {isEditing ? (
            <EditButton onClick={handleSaveClick}>Save Profile</EditButton>
          ) : (
            <EditButton onClick={handleEditClick}>Edit Profile</EditButton>
          )}
        </Section>
        <Section>
          <RequestActions
            requests={requests}
            onAccept={onRequestAccept}
            onDelete={onRequestDelete}
          />

          <DogSitters
            sitters={sitters}
            onDelete={onSitterDelete}
            onAddReview={onAddReview}
          />
        </Section>
      </ProfileSectionWrapper>
      <Gallery images={galleryImages} onUpload={onImageUpload} />
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

  const [galleryImages, setGalleryImages] = useState([user.details.profilePic]);

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

  const handleAddReview = (index, reviewText) => {
    // TODO: Add backend code to save the review to the volunteer's profile
    console.log(`Review for sitter ${index}: ${reviewText}`);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setGalleryImages([...galleryImages, reader.result]);
    };
    reader.readAsDataURL(file);
    // TODO: Add backend code to upload the image to the server
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
        onAddReview={handleAddReview}
        galleryImages={galleryImages}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default MyProfile;

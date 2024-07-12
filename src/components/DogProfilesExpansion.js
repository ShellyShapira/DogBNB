import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import dog1 from '../images/dog1.jpg';
import dog2 from '../images/dog2.jpg';
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

const BoldTextInline = styled.span`
  font-weight: bold;
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

const DogIdLabel = styled(DetailLabel)`
  text-decoration: underline;
`;

const DetailValue = styled.span`
  align: left;
  display: flex;
  color: #666;
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

const GalleryCard = styled(Card)`
  width: 100%;
`;

const ContactButton = styled.button`
  background-color: var(--BUTTON_COLOR_H1);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: box-shadow 0.3s ease-in-out;

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
  width: 300px;
  z-index: 1000;
  text-align: center;
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

const Gallery = ({ images }) => (
  <GalleryCard>
    <TitleSection>
      <TitleWithIcon>
        <img src={pawPrint} alt="Paw Print" />
        <SubTitle>Gallery</SubTitle>
      </TitleWithIcon>
    </TitleSection>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`gallery-${index}`} style={{ width: '150px', height: '150px', margin: '10px', borderRadius: '10px' }} />
      ))}
    </div>
  </GalleryCard>
);

const PersonalDetails = ({ profile }) => (
  <Card>
    <TitleSection>
      <TitleWithIcon>
        <img src={pawPrint} alt="Paw Print" />
        <SubTitle>Personal Details</SubTitle>
      </TitleWithIcon>
    </TitleSection>
    <DetailRow>
      <DetailLabel><strong>Owner Name:</strong></DetailLabel>
      <DetailValue>{profile.ownerName}</DetailValue>
    </DetailRow>
    <DetailRow>
      <DetailLabel><strong>Address:</strong></DetailLabel>
      <DetailValue>{profile.address}</DetailValue>
    </DetailRow>
    <div style={{ marginBottom: '20px' }}></div> {/* רווח נוסף בין "Address" ל-"Dog I.D" */}
    <DetailRow>
      <DogIdLabel><strong>Dog I.D</strong></DogIdLabel>
    </DetailRow>
    <Card>
      <DetailRow>
        <DetailLabel><strong>Name:</strong></DetailLabel>
        <DetailValue>{profile.name}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel><strong>Breed:</strong></DetailLabel>
        <DetailValue>{profile.breed}</DetailValue>
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
        <DetailLabel><strong>Size:</strong></DetailLabel>
        <DetailValue>{profile.size}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel><strong>Immune:</strong></DetailLabel>
        <DetailValue>{profile.immune}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel><strong>Neutered:</strong></DetailLabel>
        <DetailValue>{profile.neutered}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel><strong>Suitable For:</strong></DetailLabel>
        <DetailValue>{profile.suitableFor}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel><strong>Friendly with children:</strong></DetailLabel>
        <DetailValue>{profile.friendlyWithChildren}</DetailValue>
      </DetailRow>
    </Card>
    <DetailRow>
      <DetailLabel><strong>A Little About Me</strong></DetailLabel>
    </DetailRow>
    <Card>
      <Text>{profile.dogDetails}</Text>
    </Card>
    <DetailRow>
    <DetailLabel><strong>Care Instructions</strong></DetailLabel>
    </DetailRow>
    <Card>
      <Text>{profile.careInstructions}</Text>
    </Card>
  </Card>
);

const DogProfileCard = ({ profile, galleryImages }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const photos = [dog1, dog2];
    const photoIndex = (profile.id - 1) % photos.length;
    setPhotoUrl(photos[photoIndex]);
  }, [profile.id]);

  const handleContactClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Container>
      <GlobalStyle />
      <Header>
        <BasicInfo>
          <VolunteerName>{profile.name}</VolunteerName>
          <Text>{profile.breed}, {profile.age}, {profile.size}</Text>
          <Text>{profile.address}</Text>
          <div>
            <BoldTextInline>Dates for BBsitting:</BoldTextInline> {profile.datesForBBsitting}
          </div>
          <ContactButton onClick={handleContactClick}>Contact</ContactButton>
        </BasicInfo>
        <ProfileImage src={photoUrl} alt={`${profile.name}`} />
      </Header>
      <ProfileSectionWrapper>
        <Section>
          <PersonalDetails profile={profile} />
        </Section>
        <Section>
          <Gallery images={galleryImages} />
        </Section>
      </ProfileSectionWrapper>
      {isPopupOpen && (
        <PopupContainer>
          <h2>Thank you!</h2>
          <p>Your contact request has been sent to {profile.ownerName}.</p>
          <CloseButton onClick={handleClosePopup}>X</CloseButton>
        </PopupContainer>
      )}
    </Container>
  );
};

const DogProfiles = () => {
  const profile = {
    id: 1,
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '5 years',
    gender: 'Male',
    size: 'Large',
    immune: 'Yes',
    neutered: 'Yes',
    suitableFor: 'Apartment',
    friendlyWithChildren: 'Yes',
    ownerName: 'John Doe',
    address: '1234 Elm Street, Springfield',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    datesForBBsitting: '12/07/2023 - 20/07/2023',
    dogDetails: 'Buddy is a friendly dog that loves to play and enjoys spending time with family. Buddy is very loyal and makes a great companion.',
    careInstructions: 'Feed twice a day. Walk twice a day. Make sure he has fresh water at all times.',
  };

  const galleryImages = [dog1, dog2];

  return (
    <div>
      <DogProfileCard profile={profile} galleryImages={galleryImages} />
    </div>
  );
};

export default DogProfiles;
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import styled, { createGlobalStyle } from 'styled-components';

// ייבוא תמונות
import person1 from '../images/person1.jpg';
import person2 from '../images/person2.jpg';

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
  width: 30%;
  max-width: 1200px;
  margin: 20px auto;
  text-align: left;
  background: var(--BACKGROUND_COLOR);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: none;
  box-shadow: none;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BasicInfo = styled.div`
  text-align: left;
  flex-grow: 1;
`;

const Title = styled.h1`
  font-family: var(--TITLE_FONT);
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--TITLE_COLOR_H1);
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
  width: 100%;
  background-color: transparent;
  border-radius: 0;
  padding: 15px;
  margin: 10px 0;
  box-shadow: none;
  text-align: left;
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

const VolProfileCard = ({ profile }) => {
  return (
    <Container>
      <GlobalStyle />
      <Header>
        <BasicInfo>
          <SubTitle>{profile.name}</SubTitle>
          <Text>{profile.address}</Text>
        </BasicInfo>
        <ProfileImage>
          {profile.photo ? (
            <img src={profile.photo} alt={`${profile.name}`} />
          ) : (
            <div className="empty-image"></div>
          )}
        </ProfileImage>
      </Header>

      <Collapsible trigger={<CollapsibleTrigger>Volunteer I.D</CollapsibleTrigger>}>
        <Card>
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
            <DetailValue>{profile.adoptions}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Animal Experience:</strong></DetailLabel>
            <DetailValue>{profile.animalExperience}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Additional Animals At Home:</strong></DetailLabel>
            <DetailValue>{profile.additionalAnimals}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>A House with a Yard:</strong></DetailLabel>
            <DetailValue>{profile.yard}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Children at Home:</strong></DetailLabel>
            <DetailValue>{profile.children}</DetailValue>
          </DetailRow>
        </Card>
      </Collapsible>

      <Collapsible trigger={<CollapsibleTrigger>A Little About Me</CollapsibleTrigger>}>
        <Card>
          <Text>{profile.description}</Text>
        </Card>
      </Collapsible>

      <Collapsible trigger={<CollapsibleTrigger>Reviews</CollapsibleTrigger>}>
        <Card>
          <ReviewsContainer>
            {profile.reviews.map((review, index) => (
              <ReviewCard key={index}>
                <DetailLabel><strong>{review.reviewer}:</strong></DetailLabel>
                <DetailValue>{review.date}, {review.location}</DetailValue>
                <Text>{review.text}</Text>
              </ReviewCard>
            ))}
          </ReviewsContainer>
        </Card>
      </Collapsible>
    </Container>
  );
};

const VolProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Load the first profile as an example
    const exampleProfile = {
      name: "John Doe",
      address: "123 Main St, Anytown, USA",
      age: 30,
      gender: "Male",
      adoptions: 5,
      animalExperience: "no",
      additionalAnimals: "yes",
      yard: "Yes",
      children: "Yes",
      reviews: [
        {
          reviewer: "Jane Smith",
          date: "2023-06-01",
          location: "Anytown, USA",
          text: "John was fantastic! He took great care of our dog."
        },
        {
          reviewer: "Emily Johnson",
          date: "2023-07-15",
          location: "Anytown, USA",
          text: "Very reliable and good with animals."
        }
      ],
      photo: person1 // שימוש בתמונה מייבוא
    };
    setProfile(exampleProfile);
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <VolProfileCard profile={profile} />
    </div>
  );
};

export default VolProfile;
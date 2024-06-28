import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import avatar1 from "../images/avatar1.jpg";
import avatar2 from "../images/avatar2.jpg";
import avatar3 from "../images/avatar3.jpg";
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  border: 1px solid #ddd;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
`;

const RequestItem = styled.div`
  display: flex;
  align-items: center;
  align-text: left;
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

const requests = [
  {
    id: 1,
    name: "Rina Cohen",
    date: "12/03/24 - 11/04/2024",
    phone: "0555555555",
    avatar: avatar1
  },
  {
    id: 2,
    name: "Elad Farber",
    date: "12/03/24 - 11/04/2024",
    phone: "0555555555",
    avatar: avatar2
  },
  {
    id: 3,
    name: "Miki Shapira",
    date: "12/03/24 - 11/04/2024",
    phone: "0555555555",
    avatar: avatar3
  }
];

const RequestDOS = () => {
  const navigate = useNavigate();

  const handleNameClick = (id) => {
    navigate(`/volunteer-profile/${id}`);
  };

  return (
    <Card>
      <Title>Approved Requests</Title>
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

export default RequestDOS;

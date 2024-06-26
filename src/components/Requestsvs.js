import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  background-color: ${props => props.primary ? '#8BBBAA' : '#B05D5D'};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.primary ? '#8BBBAA' : '#B05D5D'}; /* Keep original color */
  }
`;

const RequestActions = ({ requests, onAccept, onDelete }) => {
  const navigate = useNavigate();

  const handleNameClick = (id) => {
    navigate(`/volunteer-profile/${id}`);
  };

  return (
    <Card>
      <Title>Requests</Title>
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

export default RequestActions;

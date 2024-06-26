import React, { useState } from 'react';
import '../App.css';
import RequestDOS from './Requestdos.js';
import RequestActions from './Requestsvs.js';
import DogSitters from './DogSitters.js';
import person1 from "../images/person1.jpg";
import person2 from "../images/person2.jpg";
import person3 from "../images/person3.jpg";

const initialRequests = [
  {
    id: 1,
    name: "Rina Cohen",
    date: "Today, 9.52pm",
    person: person1
  },
  {
    id: 2,
    name: "Elad Farber",
    date: "Yesterday, 12.31pm",
    person: person2
  },
  {
    id: 3,
    name: "Miki Shapira",
    date: "Wednesday, 9.12am",
    person: person3
  }
];

function RequestsMain() {
  const [requests, setRequests] = useState(initialRequests);
  const [sitters, setSitters] = useState([]);

  const handleAccept = (index) => {
    const newRequests = [...requests];
    const acceptedRequest = newRequests.splice(index, 1)[0];
    setRequests(newRequests);
    setSitters([...sitters, acceptedRequest]);
  };

  const handleDelete = (index) => {
    const newRequests = [...requests];
    newRequests.splice(index, 1);
    setRequests(newRequests);
  };

  const handleSitterDelete = (index) => {
    const newSitters = [...sitters];
    newSitters.splice(index, 1);
    setSitters(newSitters);
  };

  return (
    <div className="requestsMain">
      <div className="content">
        <h1>It's time to contact your dog's family!</h1>
        <RequestDOS />
        <h1>Review and Manage Requests</h1>
        <RequestActions 
          requests={requests} 
          onAccept={handleAccept} 
          onDelete={handleDelete} 
        />
        <DogSitters 
          sitters={sitters} 
          onDelete={handleSitterDelete} 
        />
      </div>
    </div>
  );
}

export default RequestsMain;
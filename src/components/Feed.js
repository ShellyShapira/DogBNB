import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Feed.css';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { doc, getDoc } from "firebase/firestore";
import { DB, GetCurrentUser } from './Config';

const Feed = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [showAddPost, setShowAddPost] = useState(false);
    const [posts, setPosts] = useState([
        { id: 1, image: 'images/dog1.jpg', name: 'Bulu', city: 'Segula', description: 'A friendly dog', startDate: '09/09/24', endDate: '19/09/24', gender: 'female', needsGarden: 'no' },
        { id: 2, image: 'images/dog2.jpg', name: 'Max', city: 'Jerusalem', description: 'Loves to play', startDate: '10/08/24', endDate: '24/08/24', gender: 'male', needsGarden: 'Yes' },
        { id: 3, image: 'images/dog3.jpg', name: 'Bella', city: 'Raanana', description: 'Very cuddly', startDate: '10/06/24', endDate: '13/06/24', gender: 'female', needsGarden: 'no' },
        { id: 4, image: 'images/dog4.jpg', name: 'Charlie', city: 'Yeruham', description: 'Enjoys long walks', startDate: '10/06/24', endDate: '10/09/24', gender: 'male', needsGarden: 'Yes' },
        { id: 5, image: 'images/dog5.jpg', name: 'Lucy', city: 'Tel-Aviv', description: 'Great with kids', startDate: '07/06/24', endDate: '07/07/24', gender: 'female', needsGarden: 'Yes' },
        { id: 6, image: 'images/dog6.jpg', name: 'Daisy', city: 'Haifa', description: 'Loves treats', startDate: '12/06/24', endDate: '22/10/24', gender: 'female', needsGarden: 'no' },
        { id: 7, image: 'images/dog7.jpg', name: 'Rocky', city: 'Kiryat-Gat', description: 'Very energetic', startDate: '12/06/24', endDate: '23/10/24', gender: 'male', needsGarden: 'Yes' },
        { id: 8, image: 'images/dog8.jpg', name: 'Molly', city: 'Zefat', description: 'Super friendly', startDate: '15/08/24', endDate: '27/08/24', gender: 'female', needsGarden: 'Yes' },
        { id: 9, image: 'images/dog9.jpg', name: 'Duke', city: 'Michmoret', description: 'Great guard dog', startDate: '03/06/24', endDate: '26/03/24', gender: 'male', needsGarden: 'Yes' },
    ]);

    const navigate = useNavigate();

    const [filterCity, setFilterCity] = useState('');
    const [filterDuration, setFilterDuration] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [filterNeedsGarden, setFilterNeedsGarden] = useState('');

    const clearFilters = () => {
        setFilterCity('');
        setFilterDuration('');
        setFilterGender('');
        setFilterNeedsGarden('');
    };

    const toggleFilter = () => {
        if (showAddPost) setShowAddPost(false);
        setShowFilter(!showFilter);
    };

    const toggleAddPost = () => {
        if (showFilter) setShowFilter(false);
        setShowAddPost(!showAddPost);
    };

    const reformatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year.substring(2)}`;
    };

    const fetchDogProfile = async () => {
        const user = GetCurrentUser();
        if (user) {
            const docRef = doc(DB(), 'reserved', user.uid); // Adjust collection name as needed
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log('No such document!');
                return null;
            }
        } else {
            console.log('No user logged in!');
            return null;
        }
    };

    const addPost = async (e) => {
        e.preventDefault();
        const profile = await fetchDogProfile();
        if (profile) {
            const newPost = {
                id: posts.length + 1,
                image: profile.profilePic || 'images/default_dog.jpg', // Use a default image if not provided
                name: profile.name || 'Your Dog',
                city: profile.address || 'Your City',
                description: profile.dogDetails || 'Your Description', // Ensure this matches your profile field
                startDate: reformatDate(e.target.elements.startDate.value),
                endDate: reformatDate(e.target.elements.endDate.value),
            };
            setPosts([newPost, ...posts]);
            setShowAddPost(false);
        }
    };

    const calculateDurationInDays = (startDate, endDate) => {
        const [startDay, startMonth, startYear] = startDate.split('/').map(Number);
        const [endDay, endMonth, endYear] = endDate.split('/').map(Number);
        const start = new Date(startYear, startMonth - 1, startDay); 
        const end = new Date(endYear, endMonth - 1, endDay); 
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredPosts = posts.filter(post => {
        const durationDays = calculateDurationInDays(post.startDate, post.endDate);
        return (
            (filterCity === '' || post.city.toLowerCase().includes(filterCity.toLowerCase())) &&
            ((filterDuration === '1-6' && durationDays >= 1 && durationDays <= 6) ||
             (filterDuration === '7-14' && durationDays >= 7 && durationDays <= 14) ||
             (filterDuration === '14+' && durationDays > 14) ||
             (filterDuration === '')) &&
            (filterGender === '' || post.gender.toLowerCase() === filterGender.toLowerCase()) &&
            (filterNeedsGarden === '' || post.needsGarden.toLowerCase() === filterNeedsGarden.toLowerCase()))
    });

    return (
        <div className="container">
            <div className="header-buttons">
                <button onClick={toggleFilter}><FaFilter /> Filter</button>
                <button onClick={toggleAddPost}><FaPlus /> Add Post</button>
            </div>

            {showFilter && (
                <div className="filter-container">
                    <button className="exit-filters" onClick={toggleFilter}>X</button>
                    <div className="filter-options">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" value={filterCity} onChange={(e) => setFilterCity(e.target.value)} />
                        <label htmlFor="duration">Duration</label>
                        <select id="duration" name="duration" value={filterDuration} onChange={(e) => setFilterDuration(e.target.value)}>
                            <option value="">Any</option>
                            <option value="1-6">1-6 days</option>
                            <option value="7-14">7-14 days</option>
                            <option value="14+">14+ days</option>
                        </select>
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
                            <option value="">Any</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <label htmlFor="needsGarden">Needs Garden</label>
                        <select id="needsGarden" name="needsGarden" value={filterNeedsGarden} onChange={(e) => setFilterNeedsGarden(e.target.value)}>
                            <option value="">Any</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
            )}

            {showAddPost && (
                <div className="new-post-form">
                    <button className="close-button" onClick={toggleAddPost}>X</button>
                    <p>Make sure you complete all details about your dog in "My Profile" for the best outcomes to your post</p>
                    <form onSubmit={addPost}>
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" id="startDate" name="startDate" required />
                        <label htmlFor="endDate">End Date</label>
                        <input type="date" id="endDate" name="endDate" required />
                        <button type="submit" className="post-button">Post</button>
                    </form>
                </div>
            )}

            <div className="post-grid">
                {filteredPosts.map(post => (
                    <div key={post.id} className="post">
                        <img src={post.image} alt={post.name} />
                        <h2>{post.name}</h2>
                        <p>{post.city}</p>
                        <p>{post.startDate} - {post.endDate}</p>
                        <p>{post.description}</p>
                        <button type="button" className="more-info" onClick={() => navigate(`/dog-profile/${post.id}`)}>more info</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Feed.css';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { addDoc, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { DB } from './Config';
import { UserContext } from '../App';

const Feed = () => {
    const { user } = useContext(UserContext);

    const [showFilter, setShowFilter] = useState(false);
    const [showAddPost, setShowAddPost] = useState(false);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const [filterCity, setFilterCity] = useState('');
    const [filterDuration, setFilterDuration] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [filterNeedsGarden, setFilterNeedsGarden] = useState('');

    const uploadPost = async (post) => {
        await addDoc(collection(DB(), "posts"), post);
    }

    const fillOwnerDetails = async (post) => {
        const postData = post.data();
        const postOwnerDetails = (await getDoc(doc(DB(), "users", postData.postOwnerUid))).data();

        return {
                id: post.id,
                image: postOwnerDetails.profilePic,
                name: postOwnerDetails.dogName,
                city: postOwnerDetails.address,
                description: postOwnerDetails.dogDetails,
                startDate: postData.startDate,
                endDate: postData.endDate
            }
    }


    useEffect(() => {
        onSnapshot(collection(DB(), "posts"), async (snapshot) => {
            const updatedPosts = await Promise.all(snapshot.docs.map(async (post) =>await fillOwnerDetails(post)));
            
            setPosts(updatedPosts);
        });
    }, []);

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

    const addPost = async (e) => {
        e.preventDefault();
        const profile = user.details;
        if (!profile) {
            return;
        }

        const newPost = {
            postOwnerUid: user.firebaseUser.uid,
            // id: posts.length + 1,
            // image: profile.profilePic || 'images/default_dog.jpg', // Use a default image if not provided
            // name: profile.dogName || 'Your Dog',
            // city: profile.address || 'Your City',
            // description: profile.dogDetails || 'a cute and loving dog', // Ensure this matches your profile field
            startDate: reformatDate(e.target.elements.startDate.value),
            endDate: reformatDate(e.target.elements.endDate.value),
        };
        await uploadPost(newPost);
        //setPosts([newPost, ...posts]);
        setShowAddPost(false);
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
                {user.details.registrationType !== "volunteer" &&
                 <button onClick={toggleAddPost}><FaPlus /> Add Post</button>}
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
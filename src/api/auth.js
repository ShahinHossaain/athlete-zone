// save a user to mongoDB 

import axios from 'axios';

export const saveUser = async (user, img) => {
    const { email, displayName } = user;

    console.log("ttttt", email, displayName, user);
    const currentUser = {
        email: user.email,
        image: user?.photoURL ? user.photoURL : img,
        name: user.displayName || "satar matha",
        role: 'student'
    };
    console.log("currentUser", currentUser);

    try {
        // 🔍 Check if user already exists
        const res = await axios.get(`/users/${user.email}`);

        if (res.data) {
            return; // 
        }

        // 💾 Save user if not exists
        const response = await axios.put(`/users/${user.email}`, currentUser);

    } catch (error) {
        console.error('Error in saving user:', error.message);
    }
};

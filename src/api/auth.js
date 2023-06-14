// save a user to mongoDB 

import axios from "axios";

export const saveUser = (user, img) => {
    console.log('Ussssssssser', user?.displayName, user);
    const currentUser = {
        email: user.email,
        image: user?.photoURL ? user.photoURL : img,
        name: user?.displayName,
        role: 'student'
    }

    console.log('current', currentUser);

    axios.put(`/users/${user.email}`, currentUser)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.message);
        });

}
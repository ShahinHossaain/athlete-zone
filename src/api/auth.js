// save a user to mongoDB 

import axios from "axios";

export const saveUser = (user, img) => {
    const currentUser = {
        email: user.email,
        image: user?.photoURL ? user.photoURL : img,
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
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({ baseURL: `http://localhost:3001/` })

const useAxiosSecure = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        // 1.intercept req 
        axiosSecure.interceptors.request.use(config => {
            const token = `Bearer ${localStorage.getItem("access_token")}`;
            if (token) {
                config.headers.Authorization = token;
            }
            return config
        })

        // 2.intercept res 
        axiosSecure.interceptors.response.use(res => res, async err => {
            if (err.res && (err.res.status === 401 || err.res.status === 403)) {
                await signOut(auth)
                    .then(() => {
                        // Sign-out successful.
                    })
                    .catch((error) => {
                        console.log(error);
                        navigate('/login');
                    });
                return Promise.reject(err);
            }
        })
    }, [signOut, navigate, axiosSecure])

    return [axiosSecure]
}
export default useAxiosSecure;
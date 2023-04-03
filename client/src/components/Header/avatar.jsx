import React from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {API_URL} from "../../config";
import styles from "./avatar.module.css"


const Avatar = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const isAuth = useSelector((state) => state.user.isAuth);
    const avatar = currentUser.avatar
        ? <img src={API_URL + currentUser.avatar} alt="avatar" className={styles.avatar} />
        : <PersonCircle size={25} />

    return (
        <NavLink to="/profile">
            <Button color="dark">
                {isAuth && avatar
                }</Button>
        </NavLink>
    );
};

export default Avatar;

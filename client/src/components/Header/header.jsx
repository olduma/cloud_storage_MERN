import React, { useState } from 'react';
import {
    Button, Navbar, NavbarBrand,
} from 'reactstrap';
import styles from './header.module.css';

import Logo from './logo';
import LoginHeader from './loginHeader';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/loaderReducer';
import SearchInput from './SearchInput';
import Avatar from "./avatar";
import GithubIconLink from "./githubIconLink";

function Header() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const currentDir = useSelector((state) => state.files.currentDir);

    function searchChangeHandler(e) {
        setSearchName(e.target.value);
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout);
        }
        dispatch(showLoader());
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value));
        } else {
            dispatch(getFiles(currentDir));
        }
    }

    return (
        <div className={styles.wrapper}>
            <Navbar color="dark" light className={styles.header}>
                <div className="d-flex align-items-center">
                    <NavbarBrand href="/" className="me-2">
                        <Logo />
                    </NavbarBrand>
                    {isAuth && (
                        <SearchInput searchName={searchName} searchChangeHandler={searchChangeHandler} />
                    )}
                </div>
                <div className={styles.github}>
                    <GithubIconLink githubUrl="https://github.com/olduma" />
                </div>
                {!isAuth && <LoginHeader />}
                {isAuth && (
                    <div className="d-flex align-baseline">
                        <Button color="light" outline className="me-2" onClick={() => dispatch(logout())}>
                            Log out
                        </Button>
                        <Avatar/>
                    </div>
                )}
            </Navbar>
        </div>
    );
}

export default Header;

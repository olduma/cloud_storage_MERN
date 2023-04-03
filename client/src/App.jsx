import React, {useEffect} from 'react';
import Header from './components/Header/header';
import Authorization from './components/Authorization/authorization';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./actions/user";
import Disk from "./components/Disc/Disk";
import PopupBlock from "./components/Blocks/Popup/popupBlock";
import UploadProgress from "./components/Disc/upload/uploadProgress";
import Profile from "./components/Profile/profile";

function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div>
                <PopupBlock/>
                <Header/>
                <Routes>
                    {!isAuth ?
                        <>
                            <Route exact path="/registration" element={<Authorization registration/>}/>
                            <Route exact path="/login" element={<Authorization login/>}/>
                            <Route path="*" element={<Navigate to="/login"/>}/>
                        </>
                        :
                        <>
                            <Route exact path="/" element={<Disk/>}/>
                            <Route exact path="/profile" element={<Profile/>}/>
                            <Route path="*" element={<Navigate to="/"/>}/>
                        </>
                    }
                </Routes>
                <UploadProgress/>
            </div>
        </BrowserRouter>
    );
}

export default App;

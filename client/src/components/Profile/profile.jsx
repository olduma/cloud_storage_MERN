import React from 'react';
import {Button, ButtonGroup, Card, CardBody} from "reactstrap";
import styles from "./profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../actions/user";
import {API_URL} from "../../config";
import {PersonCircle} from "react-bootstrap-icons";

const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar
        ? <img src={API_URL + currentUser.avatar} alt="avatar" className={styles.avatar} />
        : <PersonCircle size={25} />

    function changeAvatarHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div>
            <div>
                <Card className="text-center mt-5 m-auto"
                      style={{
                          width: '18rem'
                      }}
                >
                    {avatar}
                    <CardBody>
                        <ButtonGroup>
                            <input
                                accept="image/*"
                                onChange={e => changeAvatarHandler(e)}
                                type="file"
                                placeholder="upload avatar"/>
                            <Button
                                onClick={() => dispatch(deleteAvatar())}
                                color="danger"
                            >Delete</Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
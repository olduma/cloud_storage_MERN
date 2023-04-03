import React from 'react';
import {login, registration} from '../../actions/user';
import FormBlock from '../Blocks/Form/formBlock';
import {useDispatch} from "react-redux";

function Authorization(props) {
    const dispatch = useDispatch()

    if (props.registration){
        return (
            <FormBlock
                title="Create new account"
                onSubmit={(email, password) => registration(email, password)}
            />
        );
    }

    if (props.login){
        return (
            <FormBlock
                title="Log in to your account"
                onSubmit={(email, password) => dispatch(login(email, password))}
            />
        );
    }
}

export default Authorization;
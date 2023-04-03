import React from 'react';
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";

function LoginHeader(props) {
    return (
        <div>
            <NavLink to="/login">
                <Button color="light" outline className="me-2">
                    Log in
                </Button>
            </NavLink>

            <NavLink to="/registration">
                <Button color="light" outline className="me-2">
                    Sign up
                </Button>
            </NavLink>

        </div>
    );
}

export default LoginHeader;

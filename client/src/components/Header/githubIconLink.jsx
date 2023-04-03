import React from 'react';
import { Button } from 'reactstrap';
import {Github} from "react-bootstrap-icons";

const GithubIconLink = ({ githubUrl }) => (
    <Button color="link" href={githubUrl} target="_blank" rel="noopener noreferrer">
        <Github size={45} />
    </Button>
);

export default GithubIconLink;

import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from './formBlock.module.css';

function FormBlock({ title, onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleSubmit = () => onSubmit(email, password);

    return (
        <Form className={styles.wrapper}>
            <h2 className={styles.title}>{title}</h2>
            <FormGroup floating>
                <Input
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    type="email"
                />
                <Label for="exampleEmail">Email</Label>
            </FormGroup>
            {' '}
            <FormGroup floating>
                <Input
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    type="password"
                />
                <Label for="examplePassword">Password</Label>
            </FormGroup>
            {' '}
            <Button className={styles.button} color="dark" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
}

export default FormBlock;
import React from 'react';
import {Spinner} from "reactstrap";
import styles from "./SpinnerBlock.module.css"

const SpinnerBlock = () => {
    return (
        <div className={styles.spinnerContainer}>
            <Spinner
                color="primary"
                style={{
                    height: '3rem',
                    width: '3rem'
                }}
            >
                Loading...
            </Spinner>
        </div>
    );
};

export default SpinnerBlock;
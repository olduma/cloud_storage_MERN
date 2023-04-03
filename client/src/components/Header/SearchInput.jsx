import React from 'react';
import { Input } from 'reactstrap';
import styles from "./header.module.css"

function SearchInput({ searchName, searchChangeHandler }) {
    return (
        <div className={styles.search}>
            <Input
                placeholder="Start typing to filter..."
                value={searchName}
                onChange={searchChangeHandler}
            />
        </div>
    );
}

export default SearchInput;

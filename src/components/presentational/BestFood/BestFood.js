import React from 'react';
import styles from './BestFood.scss';

const bestFood = (props) => {
    return (
        <div className={styles.BestFood}>
            <h4>Best served with:</h4>
            {props.children}
        </div>
    );
}

export default bestFood;
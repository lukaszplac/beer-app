import React from 'react';
import styles from './BestFood.scss';


//simple functional component to provide infor for BeerDetails container
const bestFood = (props) => {
    return (
        <div className={styles.BestFood}>
            <h4>Best served with:</h4>
            {props.children}
        </div>
    );
}

export default bestFood;
import React from 'react';
import styles from './WheelDown.scss';

//animated component when ther are still some beers to fetch
//see css
const wheelDown = (props) => {
    return (
        <div className={styles.WheelContainer + " animated bounceInDown"}>
            <div className={styles.Wheel_1}>
                <i className="fas fa-sort-down"></i>
            </div>
            <div className={styles.Wheel_2}>
                <i className="fas fa-sort-down"></i>
            </div>
            <div className={styles.Wheel_3}>
                <i className="fas fa-sort-down"></i>
            </div>
            <div className={styles.Wheel_4}>
                <i className="fas fa-sort-down"></i>
            </div>
        </div>
    );
}

export default wheelDown;
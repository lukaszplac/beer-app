import React from 'react';
import styles from './TipRightClick.scss';

//simple functional component to provide info for Beers container
//z-index set to 1000 to appear even above modal when it is open
const tipRightClick = props => (
    <div className={styles.Tip}>
        <p>{props.text}</p>
    </div>
);

export default tipRightClick;
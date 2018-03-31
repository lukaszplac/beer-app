import React from 'react';
import styles from './TipRightClick.scss';

const tipRightClick = props => (
    //inline styles to change behavior a little bit for Tip showing when modal is open
    <div className={styles.Tip}>
        <p>{props.text}</p>
    </div>
);

export default tipRightClick;
import React from 'react';
import styles from './FavCountIndicator.scss';

const favCountIndicator = props => {
    let classes = [styles.FavCountInactive];
    if (props.favCount > 0) {
        classes = [styles.FavCount, styles.FavCountActive];
    }
    return (
        <div className={classes.join(' ')}>
            <i className="fas fa-heart"></i>
            <p>{props.favCount}</p>
        </div>
    );
}

export default favCountIndicator;
import React from 'react';
import styles from './FavCountIndicator.scss';

const favCountIndicator = props => {
    let classes = [styles.FavCountInactive];
    if (props.favCount > 0) {
        classes = [styles.FavCount, styles.FavCountActive];
    }
    if (props.favCount > 29) {
        classes = [styles.FavCount, styles.Max];
    }
    return (
        <div className={classes.join(' ')}
             onClick={props.onClickFavCount}>
            <i className="fas fa-heart"></i>
            <p>{props.favCount}</p>
        </div>
    );
}

export default favCountIndicator;
import React from 'react';
import styles from './FavIndicator.scss';

const favIndicator = (props) => {  
        let classes = props.isFavorite ? [styles.FavIndicator, styles.FavIndicatorActive] : [styles.FavIndicator];
        return (
            <div className={classes.join(' ')}
                onClick={(id) => !props.isFavorite ? props.onActivateFav(props.id) : props.onDeactivateFav(props.id) }>
                <i className="fas fa-heart"></i>
            </div>
        );
}


export default favIndicator;
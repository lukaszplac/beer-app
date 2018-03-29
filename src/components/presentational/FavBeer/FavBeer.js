import React from 'react';
import styles from './FavBeer.scss';

const favBeer = (props) => {
    let classes = [props.classes, styles.Beer];
    return (
        <div className = {classes.join(' ')}>
            <img src={props.image_url} alt={"fav beer"}/>
            <div className = {styles.TextContainer}>
                <p className = {styles.Name}>{props.name}</p>
                <p className = {styles.Tagline}>{props.tagline}</p>
            </div>
            <div onClick={props.remove}>
                <i className="fas fa-trash-alt fa-2x"></i>
            </div>
        </div>
    )
}

export default favBeer;
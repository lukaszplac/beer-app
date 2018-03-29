import React from 'react';
import styles from './FavBeer.scss';

const favBeer = (props) => {
    return (
        <div className = {styles.Beer}>
            <img src={props.image_url} alt={"fav beer"}/>
            <div className = {styles.TextContainer}>
                <p className = {styles.Name}>{props.name}</p>
                <p className = {styles.Tagline}>{props.tagline}</p>
            </div>
            <div onClick={(id) => props.remove(id)}>
                <i className="fas fa-trash-alt fa-2x"></i>
            </div>
        </div>
    )
}

export default favBeer;
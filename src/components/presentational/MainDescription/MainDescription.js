import React from 'react';
import styles from './MainDescription.scss';

//simple functional component to provide info for BeerDetails container
const mainDescription = (props) => {
    return (
        <div className={styles.MainDescr}>
            <h4>{props.name}</h4>
            <p>{props.tagline}</p>
            <p>{props.description}</p>
            <p>
                <span><strong>IBU: </strong> {props.ibu}</span>
                <span><strong>ABV: </strong> {props.abv}%</span>
                <span><strong>EBC: </strong> {props.ebc}</span>
            </p>
        </div>
    );
}

export default mainDescription;
import React from 'react';
import styles from './Beer.scss';

const beer = (props) => {
    return (
        <div className = {styles.Beer} onClick={props.clicked}>    
           <img src={props.image_url} />
           <div className = {styles.TextContainer}>
            <p className = {styles.Name}>{props.name}</p>
            <p className = {styles.Tagline}>{props.tagline}</p>
           </div>
        </div>
    )
}

export default beer;
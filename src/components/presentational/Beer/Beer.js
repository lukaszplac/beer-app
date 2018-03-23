import React from 'react';
import styles from './Beer.scss';

const beer = (props) => {
    return (
        <div className = {styles.Beer}>
           <p>{props.name}</p>
           <img src={props.image_url} />
           <p>{props.tagline}</p>
        </div>
    )
}

export default beer;
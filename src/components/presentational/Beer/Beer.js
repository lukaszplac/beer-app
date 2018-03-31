import React from 'react';
import styles from './Beer.scss';

const beer = (props) => {
    let classes = [props.classes, styles.Beer];
    return (
        <div className = {classes.join(' ')} 
             onClick={props.clicked}
             onMouseEnter={props.mouseEnter}>
            <img src={props.image_url} alt={"beer"}/>
            <div className = {styles.TextContainer}>
                <p className = {styles.Name}>{props.name}</p>
                <p className = {styles.Tagline}>{props.tagline}</p>
            </div>
        </div>
    )
}

export default beer;
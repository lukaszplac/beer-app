import React from 'react';
import styles from './Beer.scss';
import MyLittleSpinner from '../../presentational/MyLittleSpinner/MyLittleSpinner';

const beer = (props) => {
    let classes = [props.classes, styles.Beer];
    return (
        <div className = {classes.join(' ')} 
             onClick={props.clicked}
             onMouseEnter={props.mouseEnter}
             onMouseLeave={props.mouseLeave}
             onContextMenu={props.contextMenuDisable}>
            <img src={props.image_url} alt={"beer"}/>
            <div className = {styles.TextContainer}>
                <p className = {styles.Name}>{props.name}</p>
                <p className = {styles.Tagline}>{props.tagline}</p>
            </div>
            {props.showAsFav ? <i className="fas fa-heart"></i> : props.processing ? <MyLittleSpinner /> : null}
        </div>
    )
}

export default beer;
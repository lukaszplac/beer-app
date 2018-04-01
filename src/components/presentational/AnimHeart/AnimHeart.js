import React, {Component} from 'react';
import styles from './AnimHeart.scss';
import {connect} from 'react-redux';

class AnimHeart extends Component {

    render() {
        //aplying classed depending on state
        //these classes provide different rendering css when beer is added or removed
        let classes = [styles.AnimHeart];
        if (this.props.adding) {
            classes.push(styles.HeartAdding);
            }
            else if (this.props.removing) {
                classes.push(styles.HeartRemoving);
            }
        return (
            <div className={classes.join(' ')}>
                <i className="fas fa-heart"></i><span>
                    {/*if count is provided with props it is being rendered otherwise it will render -1*/}
                    {this.props.adding ? '+1' : this.props.removing ? this.props.count || '-1' : null}
                    </span>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        adding: state.favs.adding,
        removing: state.favs.removing
    }
}

export default connect(mapStateToProps)(AnimHeart);
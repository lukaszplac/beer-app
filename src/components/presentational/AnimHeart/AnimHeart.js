import React, {Component} from 'react';
import styles from './AnimHeart.scss';
import {connect} from 'react-redux';

class AnimHeart extends Component {

    render() {
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
import React, {Component} from 'react';
import styles from './FavIndicator.scss';
import {connect} from 'react-redux'

class FavIndicator extends Component {

    state = {
        isFavorite : false,
        toggle: false,
    }

    componentWillReceiveProps(nextProps) {
        let beers = Object.values(nextProps.favBeers).map(beer => beer.id);
        let isFavorite = beers.includes(nextProps.id);
        if (nextProps.favBeers !== this.props.favBeers);
            this.setState({isFavorite: isFavorite})
    }

    //this toggle is to not allow seccond click on the favorite heart to prevent sending double POST request to firebase
    changeToggleState() {
        this.setState((prev) => {
            return {
            toggle: !prev.toggle
            }
        })
    }

    onActivate(id) {
        this.changeToggleState();
        this.props.onActivateFav(id)
    }

    onDeactivate(id) {
        this.changeToggleState();
        this.props.onDeactivateFav(id)
    }
    
    render() {
        let classes = this.state.isFavorite ? [styles.FavIndicator, styles.FavIndicatorActive] : [styles.FavIndicator];
        return (
            <div className={classes.join(' ')}
                onClick= {() => !this.state.isFavorite && !this.state.toggle ? this.onActivate()  : this.onDeactivate() }>
                <i className="fas fa-heart"></i>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        favBeers: state.beer.favs
    }
}

export default connect(mapStateToProps)(FavIndicator);
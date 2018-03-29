import React, {Component} from 'react';
import styles from './FavIndicator.scss';
import {connect} from 'react-redux'
import MyLittleSpinner from '../../../presentational/MyLittleSpinner/MyLittleSpinner';

class FavIndicator extends Component {

    state = {
        isFavorite : false
    }

    componentDidMount() {
        let beers = this.props.favBeers.filter(beer => beer.id === this.props.id);
        //length > 0 this means beer is among favorites
        if (beers.length > 0){
            this.setState({isFavorite: true});
        }
    }

    onActivate(id) {
        this.setState({isFavorite: true})
        this.props.onActivateFav(id)
    }

    onDeactivate(id) {
        this.setState({isFavorite: false})
        this.props.onDeactivateFav(id)
    }
    
    render() {
        let classes = this.state.isFavorite ? [styles.FavIndicator, styles.FavIndicatorActive] : [styles.FavIndicator];
        return (
            <div className={classes.join(' ')}>
                {this.props.processing || this.props.loading ? <MyLittleSpinner /> :
                <i onClick= {() => !this.state.isFavorite ? this.onActivate()  : this.onDeactivate()}
                   className="fas fa-heart"></i>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        processing: state.favs.processing,
        loading: state.beer.loading,
        favBeers: state.beer.favs
    }
}

export default connect(mapStateToProps)(FavIndicator);
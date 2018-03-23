import React, {Component} from 'react';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import styles from './Layout.scss';
import Toolbar from '../../presentational/Toolbar/Toolbar';

class Layout extends Component {
    render() {
        return (
            <AuxComp>
                <Toolbar />
                <main className = {styles.Content}>
                    {this.props.children}
                </main>
            </AuxComp>
        )
    }
}

export default Layout;
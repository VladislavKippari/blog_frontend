
import Ayx from '../../hoc/Ayx';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    
    

    

    render () {
        return (
            <Ayx>
                <Toolbar
                    isAuth={this.props.isAuthenticated} />
              
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Ayx>
        )
    }
}

const mapStateToProps = state => {
    

    return {
        isAuthenticated: state.auth.role !== null
    };
};

export default connect( mapStateToProps )( Layout );
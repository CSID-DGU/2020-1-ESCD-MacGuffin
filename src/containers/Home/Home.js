import React, { Component } from 'react';
import Home from 'components/Base/Home/Home';
import LoginButton from 'components/Base/Header/LoginButton';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const { visible } = this.props;
        if(!visible) return null;

        return (
            <Header>
                <Home/>
            </Header>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['home', 'form'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(Login);
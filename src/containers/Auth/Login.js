import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from 'components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import storage from 'lib/storage';
import axios from 'axios';

class Login extends Component {

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'login'
        });
    }

    componentWillUnmount() {
        const {AuthActions} = this.props;
        AuthActions.initializeForm('login')
    }

    setError = (message) => {
        const {AuthActions} = this.props;
        AuthActions.setError({
            form: 'login',
            message
        });
        return false;
    }

    handleLocalLogin = async()=>{
        const{form, AuthActions, UserActions, history}= this.props;
        const {userId, password} = form.toJS();
        try {
            console.log('authactions')
            await AuthActions.localLogin({userId, password});
            console.log('로그인 성공')
            const loggedInfo = this.props.result.toJS();
            window.location.href = '/asset'
            storage.set('loggedInfo', loggedInfo);
            console.log('로컬스토리지에 저장 성공')    
        } catch(e) {
            console.log('a');
            console.log('로그인 실패')
            this.setError(' 잘못된 계정정보입니다.');
        }
    }

    render() {
        const { userId, password } = this.props.form.toJS(); // form 에서 userId 과 password 값을 읽어옴
        const { handleChange } = this;
        const { error } = this.props;

        return (
            <AuthContent title="로그인">
                <InputWithLabel 
                    label="이메일" 
                    name="userId" 
                    placeholder="이메일" 
                    value={userId} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label="비밀번호" 
                    name="password" 
                    placeholder="비밀번호" 
                    type="password" 
                    value={password} 
                    onChange={handleChange}
                />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={this.handleLocalLogin}>로그인</AuthButton>
                <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['login', 'form']),
        error: state.auth.getIn(['login','error']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Login);
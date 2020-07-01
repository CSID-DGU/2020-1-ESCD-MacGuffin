// file: src/components/Header.js
import React, { Component } from 'react';
import './Header.css';
import './LogoutButton';
import LogoutButton from './LogoutButton';

class Header extends Component {
    state = {
        name: '',
        phone: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);
        // 상태 초기화
        this.setState({
            name: '',
            phone: ''
        })
    }
    render() {
        return (
            <div className="Positioner">
            <div className="WhiteBackground">
                <div className="HeaderContents">
                    <div className="Logo">MACGUFFIN </div>
                    <div className="UserName"></div>
                    <div className="button">
                    <LogoutButton/>
                    </div>

                </div>
            </div>
            <div classname="GradientBorder"></div>
        </div>
        );
    }
}

export default Header;
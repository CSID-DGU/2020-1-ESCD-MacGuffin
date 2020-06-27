import React, { Component } from 'react';
import Asset from 'components/Asset/Asset';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'redux/modules/base';
import './Home.css';


class Home extends Component {
    //페이지에 진입할 때 헤더를 비활성화
    componentWillMount() {
        this.props.BaseActions.setHeaderVisibility(false);
    }

    // 페이지에서 벗어 날 때 다시 활성화
    componentWillUnmount() {
        this.props.BaseActions.setHeaderVisibility(true);
    }

    render() {
        return (
            <div>             
               <Asset/>
            </div>
        );
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Home);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'redux/modules/base';
import { Route } from 'react-router-dom';
import './Home.css';


class Home extends Component {
    render() {
        return (
            <div className="content">             
                <div className="introduce">
                    안녕하세요 CLOUD기반 자산관리 서비스 MACGUFFIN 입니다
                </div>
                <div className="foot">
                    <div className="f_menu">팀원명 | 학번 | 연락처 </div>
                    <div className="f_content">
                        <div>
                            장준표 | 2016112146 | jnn6576@naver.com
                        </div>
                        <div>
                            김영훈 | 2016112136 | yhkim5688@naver.com
                        </div>
                        <div>
                            박범수 | 2018112085 | to_re@naver.com
                        </div>
                        <div>
                            made by 박범수
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
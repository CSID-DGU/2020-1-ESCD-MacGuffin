<<<<<<< HEAD
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth, Asset } from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';

import storage from 'lib/storage';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from 'redux/modules/user';


class App extends Component {

    initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
        if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.
        const { UserActions } = this.props;
        UserActions.setLoggedInfo(loggedInfo);
        try {
            await UserActions.checkStatus();
        } catch (e) {
            storage.remove('loggedInfo');
            window.location.href = '/auth/login?expired';
        }
        window.location.href='/asset';         
    }

    componentDidMount() {
        this.initializeUserInfo();
    }

    render() {
        return (
            <div>
                <HeaderContainer/>
                <Route exact path="/" component={Home}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/asset_debug" component={Asset}/>
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(App);
=======
// src/App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';
import Login from './Login';
import Signup from './Signup';
import SassComponent from "./SassComponent";


class App extends Component {
  id = 2
  state={
    information: [
    {
      id: 0,
      name: 'APPLE MacBook Pro 13형',
      phone: '000-000-00-000'
    },
    {
      id:1,
      name: 'APPLE 21.5형 iMac',
      phone: '000-000-00-001'
    }
  ],
  keyword: ''
  }
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  }
  handleCreate = (data) =>{
    const {information} =this.state;
    this.setState({
      information: information.concat({id: this.id++, ...data})
    })
  }
  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      information: information.filter(info=>info.id !== id)
    })
  }
  handleUpdate = (id,data)=>{
    const {information} = this.state;
    this.setState({
      information: information.map(
        info => id === info.id?
        {...info, ...data} // 새 객체를 만들어서 기존의 값과 전달받은 data를 덮어씀
        : info // 기존의 값을 그대로 유지
      )
    })
  }

  render() {
    const { information, keyword}=this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder="검색 할 자산을 입력하세요.."
            onChange={this.handleChange}
            value={keyword}
            />
        </p>
        <hr/>
        <PhoneInfoList 
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}/>
          
        <hr/>
        <div>
        <Login/>
        </div>
        <hr/>

        <div>
        <Signup/>
        </div>

      </div>

        
      
    );
  }

}

export default App;
>>>>>>> fd587dd06db4c37c83e0c7c204522cba3bb019de

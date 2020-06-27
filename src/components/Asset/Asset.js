import React, { Component } from 'react';
import PhoneInfoList from './PhoneInfoList';
import Header from './Header';
import axios from 'axios';
import storage from 'lib/storage';



class Asset extends Component {

  
  initializeUserInfo = async () => {
    const{form, AuthActions, UserActions, history}= this.props;
    //const {AuthActions} = this.props;
    //로그인 정보가 있다면 assets api를 사용합니다.
    //const { userId, password } =
    /*Axios.get('http://52.78.190.152/api/session')
    .then(function (response){
      console.log('로그인정보 불러오기 성공')
      // 로그인 정보가 있으므로, assets를 불러옴.
      Axios.post('http://52.78.190.152/api/assets')
      // Axios.post('/api/assets', {}) 형태 아닌가?? 
      .then(function (response){
        console.log('에셋 정보 불러오기 성공')
        console.log(response);
        // api에서 자산 정보 불러오기???
      })
      .catch(function (error) {
        console.log('에셋 정보 불러오기 실패')
        console.log(error);
      });
      console.log(':)');
    })
    //로그인 정보가 없으면 에러 출력
    .catch(function (error) {
      console.log('로그인 정보 불러오기 실패')
      console.log(error);
    });*/
    
    try {
      const userId = 'yhkim5688@naver.com'
      console.log('자산불러오기')
      await axios.get('http://52.78.190.152/api/assets')
      //axios.post('http://52.78.190.152/api/assets')
      .then(res=>{console.log(res)})
      //const loggedInfo = this.props.result.toJS();
      //storage.set('loggedInfo', loggedInfo);
      //console.log('로컬스토리지에 저장 성공')
      console.log('자산불러오기 실패는 아님');
  } catch(e) {
    console.error("Error response");
    console.error(e.response.data);    // ***
    console.error(e.response.status);  // ***
    console.error(e.response.headers);
      console.log(e);
      console.log('자산불러오기 실패');
  }

  /*
    axios.post('http://52.78.190.152/api/assets')
    .then(function (response){
      console.log('자산 정보 불러오기 성공')})
    .catch(function(error){
      console.log('자산 정보 불러오기 실패')
    })
      */
  }

  componentDidMount() {
    this.initializeUserInfo();
  }

  id = 3
  state={
    information: [
    {
      id: 0,
      name: 'APPLE MacBook Pro 13형',
      phone: '000-000-00-000',
      State: 'O',
      ADate: '2020-06-14'
    },
    {
      id:1,
      name: 'APPLE 21.5형 iMac',
      phone: '000-000-00-001',
      State: 'O',
      ADate: '2020-06-10'
    },
    {
      id:2,
      name: 'I Phone SE2 64G',
      phone: '000-000-00-002',
      State: 'X',
      ADate: '2020-06-05'
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
        <Header/>
        <p>
        <div>User ID: </div>
          <input
            placeholder="검색 할 자산을 입력하세요.."
            onChange={this.handleChange}
            value={keyword}
            />
        </p>
        <hr/>
        <div id="Asset"><b>&nbsp;&nbsp;관리중인 자산목록</b></div>
         
        <PhoneInfoList 
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}/>
          
        {/* <hr/>
        <div>
        <Login/>
        </div>
        <hr/>
        
        <div>
        <Signup/>
        </div> */}
        </div>
      

        
      
    );
  }

}

export default Asset;
import React, { Component } from 'react';
import AssetInfoList from './AssetInfoList';
import Header from './Header';
import axios from 'axios';
import storage from 'lib/storage';
import { configure } from '@testing-library/react';



class Asset extends Component {
  
  initializeUserInfo = async () => { 
    const { information }=this.state;
    try {
      console.log('자산불러오기')
      //자산 정보에 자산 집어넣기
      await  axios.get('/api/assets')
      .then(function(response){
        console.log('response[0]:')
        console.log(response[0])

        console.log("###자산정보 information에 삽입###")
        information.push(response.data[0])
        
        console.log('###information[0] 출력####')
        console.log(information[0].assetId)
        console.log(information[1].assetId)
      });
      

      console.log('자산불러오기 성공');
  } catch(e) {
    console.error("Error response");
    //console.error(e.response.data);    // ***
    //console.error(e.response.status);  // ***
    //console.error(e.response.headers);
      console.log(e);
      console.log('자산불러오기 실패');
  }
  }

  componentDidMount() {
    this.initializeUserInfo();
  }

  id = 3
  state={
    information: [ 
     {
            acquiredDate: "2018-06-26T00:00:00.000Z",
            assetId: "86.112.94.211",
            category: "BOOK",
            lastModifiedDate: "2020-06-26T18:23:47.000Z",
            locationName: null,
            managerName: "김순자",
            name: "삼성노트북-E9JN24H",
            price: 700000,
            username: "김말자"
    },
    /*
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
    }*/
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
 

        <AssetInfoList 
          //data={filteredList}
          data={information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}/>
          
        </div>
      

        
      
    );
  }

}

export default Asset;
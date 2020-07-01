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
      .then((response)=>{
        console.log("###자산정보 information에 삽입###")
        for (var index in response.data){
          information.push(response.data[index])
        }
      });
      console.log('자산불러오기 성공');
  } catch(e) {
    console.error("Error response");

      console.log(e);
      console.log('자산불러오기 실패');
  }
  }

  componentDidMount() {
    this.initializeUserInfo();
  }

  id = 3
  state={
    information: [],
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

  debug = () =>{
    console.log("###FOR DEBUG###")
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
        <div id="Asset"><b>&nbsp;&nbsp;관리중인 자산목록<button onClick={this.handleUpdate}>자산 목록 업데이트</button></b></div>
       
        

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
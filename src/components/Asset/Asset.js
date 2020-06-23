import React, { Component } from 'react';
import PhoneForm from './PhoneForm';
import PhoneInfoList from './PhoneInfoList';
import Header from './Header';


class Asset extends Component {
  id = 2
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
        <div id="Asset"><b>&nbsp;&nbsp;관리중인 ASSET</b></div>
         
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
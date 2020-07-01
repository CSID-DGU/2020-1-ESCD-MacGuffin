// src/components/PhoneInfoList.js
import React, {Component} from 'react';
import PhoneInfo from './AssetInfo';
import axios from 'axios';

class AssetInfoList extends Component{
    static defaultProps = {
        list: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate: () => console.warn('onUpdate not defined'),
    }

    constructor(props) {
        super(props);
        this.state={
            list: [] 
        };

        this.initializeUserInfo = this.initializeUserInfo.bind(this)
    }

    initializeUserInfo = async () => { 
        try {
          console.log('자산불러오기')
          //자산 정보에 자산 집어넣기
          await  axios.get('/api/assets')
          .then((response)=>{
            console.log('response[0]:')
            console.log(response[0])
    
            console.log("###자산정보 information에 삽입###")
            this.setState({
                list: response.data
                
            })
            console.log(this.list)
            console.log('###information[0] 출력####')

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

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.data !== this.props.data;
    }

    render() {
        console.log('render AssetInfoList');
        

        const {data, onRemove, onUpdate }=this.props;
        const list = data.map(
            info => (
            <PhoneInfo 
            key={info.assetId} 
            info={info}
            onRemove={onRemove}
            onUpdate={onUpdate}/>)
            
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default AssetInfoList;
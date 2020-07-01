// src/components/PhoneInfoList.js
import React, {Component} from 'react';
import PhoneInfo from './AssetInfo';

class AssetInfoList extends Component{
    static defaultProps = {
        list: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate: () => console.warn('onUpdate not defined'),
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.data !== this.props.data;
    }

    render() {
        console.log('render AssetInfoList');
        console.log('###assetinfoList###')
        console.log(this.list)

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
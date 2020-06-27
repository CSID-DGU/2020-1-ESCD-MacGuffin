import {createAction, handleActions} from 'redux-actions';
import {pender} from 'redux-pender';
import * as AssetAPI from 'lib/api/auth';

import {Map} from 'immutable';

const GET_ASSET_DATA = 'asset/GET_ASSET_DATA'; // 자산 데이터 업데이트
const STOCK_ASSET_DATA = 'asset/STOCK_ASSET_DATA'; // 자산 데이터 저장

export const getAssetData = createAction(GET_ASSET_DATA, AssetAPI.getAssetData); // ???

const initialState = Map({
    Asset: Map({

    })
});

//reducer
export default handleActions({
    [CHANGE_ASSER]: (state, action) => {
        const initialForm = initialState
    }
})
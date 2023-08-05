import {reqGetDetail, reqGetShopCar} from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state={
    DetailInfo:{},
    uuid_token:getUUID()
}
const mutations={
    GETDETAIL(state,DetailInfo){
        state.DetailInfo=DetailInfo
    }
}
const actions={
    async getDetail({commit},skuId){
        let result=await reqGetDetail(skuId)
        if(result.code===200){
            commit('GETDETAIL',result.data)
        }
    },
    //加入购物车返回的解构
    //加入购物车以后（发请求），前台将参数带给服务器
    //服务器写入成功，并没有返回数据，只是返回code=200，代表这次操作成功

    async addOrUpdateShopCar({commit},{skuId,skuNum}){
        let result=await reqGetShopCar(skuId,skuNum)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters={
    categoryView(state){
        return state.DetailInfo.categoryView || {};
    },
    skuInfo(state){
        return state.DetailInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.DetailInfo.spuSaleAttrList||[]
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}
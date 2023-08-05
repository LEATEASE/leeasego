import { reqGetAddressList, reqGetTrade } from "@/api"

const state={
    addressList:[],
    tradeInfo:{}
}
const mutations={
    GETADDRESSLIST(state,addressList){
        state.addressList=addressList
    },
    GETTRADEINFO(state,tradeInfo){
        state.tradeInfo=tradeInfo
    }
}
const actions={
    async getAddressList({commit}){
        let result=await reqGetAddressList()
        if(result.code===200){
            commit('GETADDRESSLIST',result.data)
        }
    },
    async getTrade({commit}){
        let result=await reqGetTrade()
        if(result.code===200){
            commit('GETTRADEINFO',result.data)
        }
    }
}
const getters={}
export default {
    state,
    mutations,
    actions,
    getters,
}
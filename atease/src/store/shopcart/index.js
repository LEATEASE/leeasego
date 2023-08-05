import { reqCheckCart, reqDeleteCart, reqGetCartList } from "@/api"

const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const actions={
    async getCartList({commit}){
        let result=await reqGetCartList()
        if(result.code===200){
            commit('GETCARTLIST',result.data)
        }
    },
    async deteleCart({commit},skuId){
        let result=await reqDeleteCart(skuId)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async checkedCart({commit},{skuId,isChecked}){
        let result=await reqCheckCart(skuId,isChecked)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    deleteAllChecked({dispatch,getters}){
        let PromiseAll=[]
        getters.cartList.cartInfoList.forEach(item=>{
            let promise=item.isChecked?dispatch('deteleCart',item.skuId):''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    changeAllChecked({dispatch,state},isChecked){
        let PromiseAll=[]
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise=dispatch('checkedCart',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const getters={
    cartList(state){
        return state.cartList[0]||{}
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}
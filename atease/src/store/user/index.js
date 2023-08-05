import { reqGetCode, reqGetUserInfo, reqLogout, reqUserLogin, reqUserRigister } from "@/api"

//登录与注册模块
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEAR(state){
        state.token='',
        state.userInfo={}
        localStorage.removeItem('TOKEN')
    }
}
const actions={
    async getCode({commit},phone){
        let result=await reqGetCode(phone)
        if(result.code===200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userRigster({commit},user){
        let result=await reqUserRigister(user)
        if(result.code===200){
            return result.message
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    async userLogin({commit},user){
        let result=await reqUserLogin(user)
        if(result.code===200){
            commit('USERLOGIN',result.data.token)
            localStorage.setItem('TOKEN',result.data.token)
            return result.message
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    async getUserInfo({commit}){
        let result=await reqGetUserInfo()
        if(result.code===200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
        
    },
    async userLogout({commit}){
        let result=await reqLogout()
        if(result.code===200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}
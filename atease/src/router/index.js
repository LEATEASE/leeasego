import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import routes from './routes'
import store from '@/store'
//备份原来的方法
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        //要改变originPush的this指向，否则指向Windows
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        //要改变originPush的this指向，否则指向Windows
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
const router= new VueRouter({
    routes,
    scrollBehavior(to,from,savedPosition){
        return {y:0}
    }
})

router.beforeEach(async (to,from,next)=>{
    let token=store.state.user.token
    let name=store.state.user.userInfo.name
    if(token){
        if(to.path==='/login' || to.path==='/register'){
            next('/home')
        }else{
            if(name){
                next()
            }else{
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token失效的话，重新登录
                    //清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
                
            }
        }
    }else{
        // 未登录用户
        let toPath=to.path
        if(!to.meta.requireAuth){
            alert('请先登录')
            //将未登录前的想去的路由通过query参数传递，再去判断若有query则跳，否则跳/home
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }

})



export default router
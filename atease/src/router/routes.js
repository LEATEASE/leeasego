// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from "@/pages/Center"
// import MyOrder from "@/pages/Center/MyOrder"
// import GroupOrder from '@/pages/Center/GroupOrder'
//通过懒加载引入组件
export default [
        {
            path:'/enroll',
            component:()=>import('@/pages/Enroll'),
            meta:{show:false,requireAuth:true},
            name:'enroll'
        },
        {
            path:'/center',
            component:()=>import('@/pages/Center'),
            meta:{show:true},
            name:'center',
            children:[
                {
                    path:'grouporder',
                    component:()=>import('@/pages/Center/GroupOrder'),
                    meta:{show:true,requireAuth:false},
                    name:'grouporder',
                },
                {
                    path:'myorder',
                    component:()=>import('@/pages/Center/MyOrder'),
                    meta:{show:true,requireAuth:false},
                    name:'myorder',
                },
                {
                path:'/center/',
                redirect:'/center/myorder'
                }
            ],
            meta:{requireAuth:false}
        },
         {
            path:'/paysuccess',
            component:()=>import('@/pages/PaySuccess'),
            meta:{show:true,requireAuth:false},
            name:'paysuccess',
            beforeEnter: (to, from, next) => {
                if(from.path==='/pay'||from.path==='/'){
                    next()
                }else{
                    next(false)
                } 
            }
        },
        {
            path:'/pay',
            component:()=>import('@/pages/Pay'),
            meta:{show:true,requireAuth:false},
            name:'pay',
            beforeEnter: (to, from, next) => {
                if(from.path==='/trade'||from.path==='/'){
                    next()
                }else{
                    next(false) 
                } 
            }
        },
        {
            path:'/trade',
            component:()=>import('@/pages/Trade'),
            meta:{show:true,requireAuth:false},
            name:'trade',
            beforeEnter: (to, from, next) => {
                if(from.path==='/shopcart'||from.path==='/'){
                    next()
                }else{
                    next(false)
                } 
            }
        },
        {
            path:'/shopcart',
            component:()=>import('@/pages/ShopCart'),
            meta:{show:true,requireAuth:true},
            name:'shopcart',
        },
        {
            path:'/addcartsuccess',
            component:()=>import('@/pages/AddCartSuccess'),
            meta:{show:true,requireAuth:true},
            name:'addcartsuccess',
        },
        {
            path:'/detail/:skuId',
            component:()=>import('@/pages/Detail'),
            meta:{show:true},
            name:'detail',
        },
        {
            path:'/home',
            component:()=>import('@/pages/Home'),
            meta:{show:true,requireAuth:true},
            name:'home'
        },
        {
            path:'/login',
            component:()=>import('@/pages/Login'),
            meta:{show:false,requireAuth:true},
            name:'login'
        },
        {
            path:'/register',
            component:()=>import('@/pages/Register'),
            meta:{show:false,requireAuth:true},
            name:'register'
        },
        {
            path:'/search/:keyword?',
            component:()=>import('@/pages/Search'),
            meta:{show:true,requireAuth:true},
            name:'search'
        },
        //重定向，项目跑起来后，访问/跳转至首页
        {
            path:'/',
            redirect:'/home'
        },
    ]
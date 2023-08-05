//当前模块，对所有的api接口进行统一管理
import requests from './request'
import mockRequests from './mockRequest'
//三级分类
// /api/product/getBaseCategoryList

export const reqCategoryList=()=>{
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}


export const reqGetBannerList=()=>{
   return mockRequests({url:'/banners',method:'get'})
}

export const reqGetFloorList=()=>{
   return mockRequests({url:'/floor',method:'get'})
}

export const reqGetSearchInfo=(params)=>{
   return requests({url:'/list',method:"post",data:params})
}

export const reqGetDetail=(skuId)=>{
   return requests({url:`/item/${skuId}`,method:"get"})
}

export const reqGetShopCar=(skuId,skuNum)=>{
   return requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:"post"})}
//获取购物车列表
export const reqGetCartList=()=>{
   return requests({url:'/cart/cartList',method:'get'})
}
//删除购物车产品
export const reqDeleteCart=skuId=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改产品选中的状态
// /api/cart/checkCart/{skuId}/{isChecked} get
export const reqCheckCart=(skuId,isChecked)=>{
  return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})
}
//获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:"get"})

//注册用户
export const reqUserRigister=(data)=>requests({url:'/user/passport/register',data,method:"post"})

//用户登录 /api/user/passport/login   post
export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data,method:"post"})

//获取用户信息:需要用户带着token向服务器要用户信息
// /api/user/passport/auth/getUserInfo
export const reqGetUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:"get"})

//退出登录
///api/user/passport/logout  get
export const reqLogout=()=> requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList   get
export const reqGetAddressList=()=>requests({url:"/user/userAddress/auth/findUserAddressList",method:'get'})

//获取商品清单
// /api/order/auth/trade  get 
export const reqGetTrade=()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单
//  /api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})

//获取支付信息
//  /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取订单支付状态
// /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取订单列表
// /api/order/auth/{page}/{limit}  get
export const reqOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:"get"})

//获取mock测试信息

export const reqGetText=()=>{
   return mockRequests({url:'/text',method:'get'})
}
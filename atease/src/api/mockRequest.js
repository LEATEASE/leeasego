import axios from 'axios'
import nProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//对axios进行二次封装
//利用axios对象的方法create，去创建一个axios实例
const requests=axios.create({
    //基础路径，发请求是路径当中会出现api
    baseURL:"/mock",
    //请求超时的时间
    timeout:5000,
})
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性很重要，Headers请求头
    nProgress.start()
    return config
})

requests.interceptors.response.use((res)=>{
    nProgress.done()
    return res.data
},(error)=>{
    //终止Promise链
    return Promise.reject(new Error('faile'))
})


export default requests
import {v4 as uuidv4} from 'uuid'
//生成且只生成一次uuid，如果本地存储没有uuid则生成且存入本地，如果有则直接调用本地存储的uuid
export const getUUID=()=>{
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        uuid_token=uuidv4();
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    return uuid_token
}
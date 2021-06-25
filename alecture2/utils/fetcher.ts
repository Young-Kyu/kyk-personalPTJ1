import axios from "axios";


// fetcher를 다양하게 만들어서 여러개의 자료형을 대응하는것이 좋다.

const fetcher = (url : string) => axios.get(url,{
    withCredentials:true, // cookie 생성을 위해 설정, front - backend 서버의 도메인이 다르면 cookie가 생성되지 않아 로그인 로직을 실행할 수 없다.
}).then(response => { 
    return response.data});

export default fetcher;
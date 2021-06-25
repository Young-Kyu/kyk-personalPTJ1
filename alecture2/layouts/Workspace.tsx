import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback,FC } from 'react';
import { Redirect } from 'react-router';
import useSWR, { mutate } from 'swr';
const Workspace : FC = ({children}) =>{  // children을 사용하면 FC타입 아니면 VFC타입을 사용

    const {data,error,revalidate,mutate} = useSWR('http://localhost:4005/api/users',fetcher);

    // 만약 같은 api에서 fetcher를 다르게 쓰고 싶다면 하기와 같이 url을 우회하는 방법으로 사용한다.
    // 서버는 #을 무시하기 때문
    // const {data,error,revalidate,mutate} = useSWR('http://localhost:4005/api/users?or#1234',fetcher);

    // swr은 비동기 데이터 뿐만 아니라 하기처럼 localstorage 등 여러방면에서도 사용할 수 있다.
    // const {data2} = useSWR('hello', key => { localStorage.setItem('data',key); return localStorage.getItem('data')});
    // 받아올 때는 const data = useSWR('hello') 로 불러오면 됨 

    const onLogout = useCallback(() =>{
        axios.post('http://localhost:4005/api/users/logout',null,{
            withCredentials:true
        }).
        then(res=>{
            console.log(res);
            // revalidate();
            mutate(false,true);
        });
    },[]);
    console.log(data);
    if(!data){
        return <Redirect to="/login" />;
    }

    return(
        <div>
            <button onClick={onLogout}>로그아웃</button>
            {children}
        </div>
    )

}

export default Workspace;

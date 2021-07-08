import { useInput } from '@hooks/userInput';
import React,{useCallback} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import '@styles/login.scss';
const LogIn = () =>{

    const [email,onChangeEmail] = useInput('');
    const [password,onChangePassword] = useInput('');
    const {data,error,revalidate,mutate} = useSWR('http://localhost:4005/api/users',fetcher,{
        dedupingInterval:100000, // 주기적으로 호출은 되지만 interval 기간 내에는 캐시에서 데이터를 불러오기 때문에 백엔드 서버의 부담을 덜 수 있음
    });//fetcher가 실제 api 통신을 하는 주체이다.

    const onSubmit = useCallback(e =>{
        e.preventDefault();

        axios
            .post(
                'http://localhost:4005/api/users/login',
                {email,password},
                {
                    withCredentials:true
                }
            )
            .then(res =>{
                // revalidate(); // success시 바로 useSWR을 실행시켜주는 함수 
                // 단점 : api 호출을 한번 더 해야한다.
                // revalidate / mutate 차이
                // revalidate : api 호출을 해서 데이터를 받아 state에 넣는다.
                // mutate : 기존에 가지고 있던 데이터를 state에 넣는다.
                mutate(res.data,true);
            })
            .catch(err=>{
                console.log(err);
            })


    },[email,password]);
    
    if(data === undefined){
        return <div>로딩중...</div>
    }

    if(data){
        return <Redirect to="/workspace/channel" />
    }

    return(
        <div id="container">
            <header className="headerTitle">Sleact</header>
            <form onSubmit={onSubmit} className='contentForm'>
                <label id='email-label'  className="titleLabel">
                    <span>이메일 주소</span>                    
                    <div>
                        <input type="email" 
                                id="email" 
                                name="email" 
                                value={email} 
                                onChange={onChangeEmail}
                                className="inputArea"
                        />
                    </div>
                </label>
                <label id="password-label" className="titleLabel">
                    <span>비밀번호</span>
                    <div>
                        <input type="password" 
                                id="password" 
                                name="password" 
                                value={password}
                                onChange={onChangePassword}
                                className="inputArea"
                        />
                    </div>
                </label>
                <button className="inputArea" type="submit">로그인</button>
            </form>
            <p className="linkContainer">
                아직 회원이 아니신가요?&nbsp;
                <Link to="/signup">회원가입 하러 가기</Link>
            </p>
        </div>
    )
}
export default LogIn;
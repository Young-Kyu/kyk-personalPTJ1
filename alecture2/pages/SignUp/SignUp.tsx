import React,{useCallback, useState} from 'react';
import axios from 'axios';
import '@styles/signup.scss';
import { useInput } from '@hooks/userInput';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
const SignUp = () =>{
    const {data,error,revalidate} = useSWR('http://localhost:4005/api/users',fetcher,{
        dedupingInterval:100000, // 주기적으로 호출은 되지만 interval 기간 내에는 캐시에서 데이터를 불러오기 때문에 백엔드 서버의 부담을 덜 수 있음
    });//fetcher가 실제 api 통신을 하는 주체이다.

    const [email, onChangeEmail ] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password,_1,setPassword] = useInput('');
    const [passwordCheck,_2,setPasswordCheck] = useInput('');
    const [mismatchError,setMismatchError] = useState(false);
    const [signUpError,setSignUpError] = useState('');
    const [signUpSuccess,setSignUpSuccess] = useState(false);

    const onChangePassword = useCallback(e =>{
        setPassword(e.target.value);
    },[]);

    const onChangePasswordCheck = useCallback(e =>{
        setPasswordCheck(e.target.value);
        setMismatchError(e.target.value === password);
    },[password])

    const onSubmit = useCallback(e =>{
        e.preventDefault();
        
        // axios.post('/api/users',{ //proxy 서버 적용한 URL
        //     email,nickname,password
        // })
        setSignUpError('');
        setSignUpSuccess(false);
        axios.post('http://localhost:4005/api/users',{
            email,nickname,password
        })
        .then(res =>{setSignUpSuccess(true)})
        .catch(err =>{
            console.log(err.response);
            setSignUpError(err.response.data);
        })
        .finally(()=>{console.log('finally')});

    },[email,nickname,password,passwordCheck]); // 이 함수 내부에서 사용하는것들을 모두 뎁스에 넣을 것 / 업데이트 내용을 반영하기 위해서 

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
                <label id="email-label" className="titleLabel">
                    <span>이메일 주소</span>
                    <div>
                        <input type="email" id='email' name='email' value={email}  onChange={e => {onChangeEmail(e)}} className="inputArea"/>
                    </div>
                </label>
                <label id="nickname-label" className="titleLabel">
                    <span>닉네임</span>
                    <div>
                        <input type="text" id='text' name='text' value={nickname}  onChange={e => onChangeNickname(e)} className="inputArea"/>
                    </div>
                </label>
                <label id="password-label" className="titleLabel">
                    <span>비밀번호</span>
                    <div>
                        <input type="password" id='password' name='password' value={password} onChange={e=>onChangePassword(e)} className="inputArea"/>
                    </div>
                </label>
                <label id="password-check-label" className="titleLabel">
                    <span>비밀번호 확인</span>
                    <input 
                        type="password"
                        id="password-check"
                        name="password-check"
                        value={passwordCheck}
                        onChange={e=>onChangePasswordCheck(e)}
                        className="inputArea"
                    />    
                </label>
                <button className="inputArea" type="submit">회원가입</button>
            </form>
            { !mismatchError && <div>비밀번호가 일치하지 않습니다.</div>}
            {nickname && <div>닉네임을 입력해주세요.</div>}
            {signUpError && <div>{signUpError}</div>}
            {signUpSuccess && <div>회원가입되었습니다! 로그인해주세요.</div>}             
            <p className="linkContainer">
                이미 회원이신가요?&nbsp;
                <Link to="/login">로그인 하러 가기</Link>
            </p>
        </div>
    );
}

export default SignUp;
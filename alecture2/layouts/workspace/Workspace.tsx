import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback,FC,useState } from 'react';
import { Redirect,Switch,Route } from 'react-router';
import useSWR, { mutate } from 'swr';
import '@styles/workspace.scss';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import Menu from '@components/menu/Menu';
import { Link } from 'react-router-dom';
import { IUser } from '@typings/db';

const Channel = loadable(()=>import('@pages/channel/Channel'));
const DirectMessage = loadable(()=>import('@pages/directMessage/DirectMessge'));
const Workspace : FC = ({children}) =>{  // children을 사용하면 FC타입 아니면 VFC타입을 사용

    const {data : userData,error,revalidate,mutate} = useSWR<IUser | false/*로그인 안되어있을 때 처리*/>('http://localhost:4005/api/users',fetcher);
    const [showUserMenu,setShowUserMenu] = useState(false);
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
            // revalidate();
            mutate(false,true);
        });
    },[]);
    
    const onClickUserProfile = useCallback(() =>{
        
        setShowUserMenu(prev => !prev);
        
    },[]);

    const onClickCreateWorkSpace = useCallback(()=>{

    },[]);
    
    if(!userData){
        return <Redirect to="/login" />;
    }

    return(
        <div>
            <div className="header">
                <div className="rightMenu">
                    <span onClick={onClickUserProfile}>
                        <img className='profileImg' src={gravatar.url(userData.email,{s:'28px',d:'retro'})}alt={userData.nickname}/>
                        {showUserMenu &&
                            <Menu style={{right : 0, top:38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                                <div className="profileModal">
                                    <img src={gravatar.url(userData.email,{s:'36px',d:'retro'})}alt={userData.nickname}/>
                                    <div>
                                        <span id="profile-name">{userData.nickname}</span>
                                        <span id="profile-active">Active</span>
                                    </div>
                                </div>
                                <button className='logoutButton' onClick={onLogout}>
                                    로그아웃
                                </button>
                            </Menu>
                        }
                    </span>
                </div>
            </div>
            <div className='workspaceWrapper'>
                <div className='workspaces'>
                    {userData.Workspaces.map((ws ,index : number) =>{
                        return (
                            <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                                <button className='workspaceButton'>
                                    {ws.name.slice(0,1).toUpperCase()}
                                </button>
                            </Link>
                        )
                    })}
                    <button className='addButton' onClick={onClickCreateWorkSpace}>+</button>
                </div>
                <nav className='channels'>
                    <div className='workspaceName'>Sleact</div>
                    <div className='menuScroll'>menu Scroll</div>
                </nav>
                <div className='chats'>
                    <Switch>
                        <Redirect exact path="/workspace" to="/workspace/channel" />
                        <Route path="/workspace/channel" component={Channel} />
                        <Route path="/workspace/dm" component={DirectMessage} />
                    </Switch>
                </div>
            </div>
        </div>
    )

}

export default Workspace;

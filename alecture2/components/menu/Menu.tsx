import React,{CSSProperties, FC, useCallback} from 'react';
import '@styles/menu.scss';

interface Props{
    show:boolean;
    onCloseModal: () => void;
    style : CSSProperties;
    closeButton?:boolean;
}
// 제네릭으로 Props interface를 연결함
const Menu : FC<Props> = ({children,style,show,onCloseModal,closeButton}) =>{

    const stopPropagation = useCallback(e =>{
        e.stopPropagation();
    },[])

    return(
        <div className='createMenu' onClick={onCloseModal}>
            <div style={style} onClick={stopPropagation}>
                {closeButton && <div onClick={onCloseModal}>X</div>}
                {children}
            </div>
        </div>
    )
}

Menu.defaultProps ={
    closeButton : true,
}

export default Menu;
import { SetStateAction, useCallback, useState,Dispatch } from "react"


// 제네릭 공부할 것 
// 매개변수 T , 리턴타입 T로 선언하면 장점 : 매개변수가 string일 경우 리턴값이 string , number일 경우 number와 같이 매개변수와 자료형을 맞춰준다
// any로 할 경우 실행은 되지만 리턴값의 형 지정을 못해준다.
// [T,(e:any) => void, Dispatch<SetStateAction<T>>] 설명
// T :return 구문에서 value에 대한 자료형 (매개변수로 넘어온 자료형으로 반환하겠다는 의미)
// (e:any) => void : return 구문에서 hander에 대한 자료형 
// 리턴타입을 리턴 자리에 그대로 써도 되고 변수로 빼서 써도 된다
// <T=any> 제네릭의 기본타입을 지정해준 것을 따라 쓰면 된다.

type ReturnTypes<T=any> = [T,(e:any) => void, Dispatch<SetStateAction<T>>];
export const useInput = <T = any>(initialData:T) : ReturnTypes<T> =>{ 
    
    const [value,setValue] = useState(initialData);
    const handler = useCallback(e =>{
        setValue(e.target.value);
    },[])
    return [value,handler,setValue];
}

// 리턴타입에서 any를 쓰고싶지 않을 때 사용하는 ChangeEvent 각 엘리먼트들이 사용하는 이벤트의 정의를 입력하면 된다.
// e : ChangeEvent(HTMLInputElement) / e.target.value as unknown as T 변경

// type ReturnTypes<T=any> = [T,(e:ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];
// export const useInput = <T = any>(initialData:T) : ReturnTypes<T> =>{ 

//     const [value,setValue] = useState(initialData)
//     const handler = useCallback(e =>{

//         setValue(e.target.value as unknown as T);

//     },[])
//     return [value,handler,setValue];
// }
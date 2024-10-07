// eslint-disable-next-line no-unused-vars
import React, {useCallback, useMemo, useState} from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos.jsx";

export default function App(){
    const [count, setCount] = useState(0)
    const [todos, setTodos] = useState([])

    const increment =() => {
        setCount(c => c+1)
    }

    //상태변경 함수
    // count 상태값이 변경되면 todo 컴포넌트가 재렌더링 된다.
    /*const addTodo =() => {
    setTodos(t => [...t, "New todo"])
    }   */
    // 배열 todos 의 이전상태 t를 복사한 후 새로운 문자열 추가

    //  의존성이 변경될때만 실행되는 함수 -> todos가 변경될때만 todos를 리렌더링한다
    // 메모화(캐시에 저장된 값으로 사용됨)
    const addTodo = useCallback( () =>{
        setTodos(t => [...t, "New todo"])
    },[todos])

    return (
        <>
            <Todos todos={todos} addTodo={addTodo}/>
            <hr/>
            <div>
                count:{count}
                <button onClick={increment}> + </button>
            </div>
        </>
    )
}   // App 함수 끝

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)


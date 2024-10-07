import {memo} from "react"

const Todos = ({todos, addTodo}) => {
    console.log("child Todos render")
    console.log("1-", todos)
    return (
        <>
            <h2>My todos</h2>
            {todos.map((t,i) => {
                return <p key={i}></p>
            })}
            <button onClick={addTodo}>Add Todo</button>
        </>
    )
}

export default memo(Todos)
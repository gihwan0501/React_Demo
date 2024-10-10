import {useContext, useEffect, useState} from "react";
import PageSpinner from "../UI/PageSpinner.jsx";
import UserContext from "./UserContext.js";
import useFetch from "../utils/useFetch.js";

// 형제 컴포넌트 UserDetails 와 공유해야 합니다.
function UserList (){
    // fetch 중 오류 또는 로딩 중에 상태값
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    //user 상태값을 UserContext 에서 가져옵니다.
    const {user, setUser} = useContext(UserContext)
    //api 서비스 제공하는 서버로부터 데이터 가져오기

    const {data: users= [], status} = useFetch(
        "http://localhost:3001/users"
    )

    useEffect(() => {
        setUser(users[0])
    }, [users, setUser]);

    if(status === "error") {
        return <div>오류 : {error}</div>
    }

    if(status === "loading") {
        return <PageSpinner/>
    }

  //순서 6) users, user 상태값으로 UI를 만듭니다.
    return(
        <>
            {users && (<ul className="users items-list-nav">
                {users.map((u) => (
                    <li key={u.id}
                        className={u.id === user?.id ? "selected" : null}>
                        <button className="btn btn-header"
                                onClick={() => setUser(u)}>
                            {u.name}
                        </button>
                    </li>
                ))}
            </ul>)}
            {/* UserDetails 로 컴포넌트 분리합니다.*/}
       {/*     {user && (<div className="item user">
                <div className="item-header">
                    <h2>{user.name}</h2>
                </div>
                <div className="user-details">
                    <h3>{user.title}</h3>
                    <p>{user.notes}</p>
                </div>
            </div>)}*/}
        </>
    )
}

export default UserList
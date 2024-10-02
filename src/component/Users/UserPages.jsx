import {users} from "../../static.json"
import {useState} from "react";
import {FaArrowRight} from "react-icons/fa";

function UserPages() {

    {/*사용자 이름 목록 만들기*/}
    /*export default function UsersList () {
                const [userIndex, setUserIndex] = useState(0);
                    return (
                            <ul className="users items-list-nav">
                                {users.map((u, i) => (
                                 <li key={u.id} className={i === userIndex ? "selected" : null}>
                                    <button className="btn" onClick={() => setUserIndex(i)}>
                                {u.name}
                                     </button>
                                </li>
                            ))}
                        </ul>
                    );
                };*/

    const group = "name"
    const userPickerGroup = users.filter(u => (u.name === name))
    const [userPickerIndex, setUserPickerIndex] = useState(0)

    function nextUserPickerIndex() {
        setUserPickerIndex((i) => (i+1) % userPickerGroup.length)
    }

    return (
        <main className="users-page">
            <h4>사용자 리스트</h4>
            <ul className="items-list-nav">
                {userPickerGroup.map((u, i) => (
                    <li key={u.title}
                        className={u === userPickerIndex ? "selected" : null}>
                        <button className="btnUser"
                                onClick={() => setUserPickerIndex(i)}>
                            {u.title}
                        </button>
                    </li>
                ))}
            </ul>
            <p>
                <button className="btnUser" onClick={nextUserPickerIndex}>
                    <FaArrowRight/><span>Next</span>
                </button>
            </p>
        </main>
    )
}

export default UserPages
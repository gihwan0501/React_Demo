import {bookables, days, sessions} from "../../static.json"
import {useReducer, useState} from "react";
import {FaArrowRight} from "react-icons/fa";

function BookList() {
    // 상태를 관리할 변수들 초기값 객체
    const initState = {
        group: "Rooms",
        bookableIndex: "0",
        hasDetails: false
    }
    // state는 상태값들을 모아놓은 object이다.
    const [state, dispatch] = useReducer(reducer, initState)
    const {group, bookableIndex, hasDetails} = state

    const bookableGroup = bookables.filter(b => (b.group === group))
    const groups = [...new Set(bookables.map(b=>b.group))]// 현재 상황인거고, 그룹이 추가되면 바꿔야함 ["Rooms", "Kit"]


    function nextBookableIndex() {
        setBookableIndex((i) => (i+1) % bookableGroup.length)
    }

    function changeGroup(event) {
        setGroup(event.target.value)
        setBookableIndex(0)
    }

    const bookable = bookableGroup[bookableIndex]
    const [hasDetails, setHasDetails] = useState(false);
    return (
        <>
        <div>
            <select value={group} onChange={changeGroup}>
                {groups.map(g =><option key={g} value={g}>{g}</option>)}
            </select>
        <ul className="items-list-nav">
            {bookableGroup.map((b,i) => (
                <li key={b.id}
                    className={i=== bookableIndex? "selected":null}>
                    <button className="btn"
                        onClick={() => setBookableIndex(i)}>
                        {b.title}
                    </button>
                </li>
            ))}
        </ul>
            <p>
                <button className="btn" onClick={nextBookableIndex}>
                    <FaArrowRight/><span>Next</span>
                </button>
            </p>
        </div>

        {/* 새로운 UI 추가, CSS 추가 : 상세 내용 */}
        <div className="book-details">
            <div className="item">
                <h2>{bookable.title}</h2>
                <span className="controls">
                    <label>
                        <input type="checkbox" checked={hasDetails} onChange={()=>setHasDetails(has=>!has)}/>
                    </label>
                </span>
            </div>
            <p>{bookable.notes}</p>
            {hasDetails && (
                <div className="item-details">
                    <h3>사용 가능한 요일과 세션</h3>
                    <div className="bookable-availability">
                        <ul>
                            {bookable.days.sort().map(d => <li key={d}>{days[d]}</li>)}
                        </ul>
                        <ul>
                            {bookable.sessions.sort().map(s => <li key={s}>{sessions[s]}</li>)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default BookList
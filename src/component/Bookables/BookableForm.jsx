import {days as daysArray, sessions as sessionsArray} from "../../static.json"

export default function BookableForm({formState = {}}) {
    // state가 undefined일때를 위한 초기값이 필요함
    const {state = {}, setState} = formState
    const {title = "", group = "", notes = ""} = state
    const {days = [], sessions = []} = state

    /* input 요소의 value는 상태값 state 변수임
    <- BookableEdit에서 useState로 만들어진 변수 */
    function handleChange(e) {
        // setState로 값을 변경 -> input요소에 변화가 보인다.
        // input 요소는 name, value 속성값 한쌍으로 저장되어야함
        setState({
            ...state, /* 현재 state 객체값 복사 */
            [e.target.name]: e.target.value /* 이벤트 발생시킨 input 요소만 업데이트 */
        })
    }

    function handleChecked(e) {
        // setState로 값을 변경
        // 많은 체크박스 중 하나를 클릭한 것에 대한 이벤트 핸들러
        // 이벤트를 발생시킨 체크박스는 하나이고 그것에 대한 name,value,체크여부를 저장
        const {name, value, checked} = e.target
        // 체크박스 name은 두개 중 하나. days, sessions 배열 현재상태값 가져오기
        const values = new Set(state[name])
        // 클릭한 체크박스의 value 문자열을 정수로 변환하여 저장
        const intValue = parseInt(value, 10)

        // 일단 해당 intValue를 values 배열에서 삭제하기
        values.delete(intValue)
        // 다시 확인 체크 상태인지 확인하여 values 배열에 추가
        if (checked) values.add(intValue)

        //
        setState({
            ...state,
            [name]: [...values] // days 또는 sessions 배열을 수정
        })
    }
    return (
        <main className="bookables-form">
            <div className="item item-form">
                <div className="item-header">
                    <h2>{/*{handleDelete ? "Edit" : "New"}*/}Bookable</h2>
                </div>

                <label htmlFor="title" className="field">Title</label>
                <input type="text" name="title" value={title} onChange={handleChange}/>

                <label htmlFor="group" className="field">Group</label>
                <input type="text" name="group" value={group} onChange={handleChange}/>
                <div>
                    <label htmlFor="notes" className="field">Notes</label>
                    <textarea name="notes" value={notes} onChange={handleChange} rows="4"/>
                </div>
                <div className="bookable-availability">
                    <ul>
                        {daysArray.map((day, i) => (
                            <li key={day}><label>
                                <input checked={days.indexOf(i) !== -1} type="checkbox" name="days" value={i}
                                       onChange={handleChecked}/>{day}</label></li>
                            ))}
                    </ul>

                    <ul>
                        {sessionsArray.map((session, i) => (
                            <li key={session}><label>
                                <input checked={sessions.indexOf(i) !== -1} type="checkbox" name="sessions"
                                       value={i} onChange={handleChecked}/>{session}</label></li>
                            ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}

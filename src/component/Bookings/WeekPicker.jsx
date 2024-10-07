import {FaCalendarDay, FaChevronLeft, FaChevronRight,FaCalendarCheck} from "react-icons/fa";
import {formatDate} from "../utils/date-utils.js";
import {useRef} from "react";

function WeekPicker({week,dispatch}){
    //* go 버튼 추가 : useRef 새로이 사용한 훅
    // input 요소 값을 state로 관리하면 바로 set 함수 실행해서 잘못된 출력이 나올 가능성이 있다.
    // 사용자가 버튼을 눌렀을 때 함수를 실행하도록 함.
    // useRef는 document.getElementById()와 같은 동작을 할 수 있도록 함
    // 리턴 객체 참조변수 textboxRef를 설정한 input 요소에 대해 동작함
    const textboxRef = useRef();

    function goToDate () {
        dispatch({
            type: "SET_DATE",
            payload: textboxRef.current.value
            /* document.getElementById().value의 역할 - get, set 가능 */
        });
    }
    
    return (
        <div>
            <p className="date-picker">
                <button className="btn" onClick={() => dispatch({type: "PREV_WEEK"})}>
                    <FaChevronLeft/>
                    <span>PREV</span>
                </button>
                <span>
                  <input type="text" ref={textboxRef} /*useRef로 참조되는 input 객체*/
                         placeholder="YYYY-MM-DD" defaultValue={formatDate(new Date())}/>
                <button className="go btn" onClick={goToDate}>
                  <FaCalendarCheck/>
                  <span>Go</span>
                </button>
              </span>
                <button className="btn" onClick={() => dispatch({type: "TODAY"})}>
                    <FaCalendarDay/>
                    <span>Today</span>
                </button>
                <button className="btn" onClick={() => dispatch({type: "NEXT_WEEK"})}>
                    <span>NEXT</span>
                    <FaChevronRight/>
                </button>
            </p>
            <p>
                {/*{week.start.toLocaleString().substring(0,13)}
                ~ {week.end.toLocaleString().substring(0,13)}*/}
                {formatDate(week.start)} ~ {formatDate(week.end)}
            </p>
        </div>
    )
}

export default WeekPicker
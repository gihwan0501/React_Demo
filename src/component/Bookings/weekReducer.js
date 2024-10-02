import getWeek from "./date-util.js";

export default function reducer(state, action) {
    switch(action.type) {
        case "NEXT_WEEK":
            return getWeek(state.date,7);
            /* 지정된 날짜 + 7 */
        case "PREV_WEEK":
            return getWeek(state.date, -7);
            /* 지정된 날짜 - 7 */
        case "TODAY":
            return getWeek(new Date());
            /* 오늘 날짜 */
        case "SET_DATE":
            /* 임의의 날짜 : action.payload*/
            return getWeek(new Date(action.payload));
        default:
            // return state
            throw new Error(`알 수 없는 action type: ${action.type}`)
    }

}


// return은 getWeek 메소드로 변경된 state.date를 구한다
// state는 오브젝트 : date(선택날짜),
//          start(date 날짜 해당 주 시작날짜), end(마지막 날짜)
// getWeek 메소드는 다른 컴포넌트에서도 실행한다.
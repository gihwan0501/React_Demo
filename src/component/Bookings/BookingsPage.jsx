import WeekPicker from "./WeekPicker.jsx";
import BookablesList from "../Bookables/BookablesList.jsx";
import {useState} from "react";
import Bookings from "./Bookings.jsx";
import useFetch from "../utils/useFetch.js";
import {useSearchParams} from "react-router-dom";
import PageSpinner from "../UI/PageSpinner.jsx";

function BookingsPage(){
    // 2) fetch로 직접 해당 자원 조회 -> BookablesList 컴포넌트에게 전달
    const {data:bookables = [], status, error} = useFetch(
        "http://localhost:3001/bookables"
    )
    // 3) /bookings?bookableId=3과 같이 쿼리스트링값을 가져오기
    // url에 실려오는 쿼리문자열을 가져오기 위해 2개의 값을 배열로 리턴해준다
    // searchParam 첫번째 리턴값은 함수 : 이 함수로 파라미터 가져온다
    // setSearchParam 두번째 리턴값은 첫번째 함수를 변경할 때 사용 (우리는 사용 안함)
    const [searchParam, setSearchParam] = useSearchParams();
    // 4) 2)번 url에 포함된 쿼리스트링 파라미터 가져오기
    const id = searchParam.get("bookableId") // 파라미터 이름 알려주면 값을 리턴한다
    // 5) 조회한 bookable 저장. 파라미터 없으면 인덱스 0번값 저장
    // id는 문자열 타입. 정수로 바꾸기 => 비교 => id 같은 bookable 찾아 리턴
    // || (or 연산 활용한 단축 평가) : || 앞의 결과가 거짓이면 || 뒤의 식을 수행
    const bookable = bookables.find(b => b.id === parseInt(id, 10)) || bookables[0]

    if(status === "error") {
        return <p>{error.message}</p>
    }
    if(status === "loading") {
        return <PageSpinner/>
    }
    return(
        <main className="bookings-page">
            {/* 1) BookablesList 리팩토린 된 것에 맞춰서 변경*/}
          <BookablesList bookable={bookable} bookables={bookables} getUrl={(id) => `/bookings?bookableId=${id}`}/>
   {/* BookablesList 선택한 bookable 객체는 bookings에게 프로퍼티값 단순한 전달 */}
          <Bookings bookable={bookable}/>
        </main>
    )
}

export default BookingsPage
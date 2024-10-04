import BookableDetails  from "./BookableDetails.jsx";
import BookablesList from "./BookablesList.jsx";
import {useState} from "react";

export default function BookablesView () {
    //부모 BookablesView 컴포넌트가 state 변수 선언하고
    // 자식 BookablesList, BookableDetails 컴포넌트에게 프롭스(props)를 전달함
    // 자식 컴포넌트에서 state 변수값 변경할 수 있도록 변경 함수도 전달한다.
    const [bookable, setBookable] = useState();
    return (
        <>
            <BookablesList bookable={bookable} setBookable={setBookable}/>
            <BookableDetails bookable={bookable}/>
        </>
    );
}
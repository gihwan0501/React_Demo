import {Link, useParams} from "react-router-dom";
import useFetch from "../utils/useFetch.js";
import BookableDetails  from "./BookableDetails.jsx";
import BookablesList from "./BookablesList.jsx";
import {FaPlus} from "react-icons/fa";
import PageSpinner from "../UI/PageSpinner.jsx";
import {useQuery} from "react-query";
import loadData from "../utils/api.js";

export default function BookablesView () {

    // useQuery의 리턴은 fetch 결과는 data 프로퍼티에 저장. 프로퍼티값은 bookables에 저장
    // status.error 추가적인 실행 상태 정보도 전달 => 카톡 그림 참고
    const {data: bookables = [], status, error} = useQuery(
        "bookables", () => loadData("http://localhost:3001/bookables")
    );
    // 첫번째 인자는 브라우저에 저장된 cache를 가져오기 key (문자열, 배열, 객체)
    // 두번째 인자는 비동기 함수
    // useFetch는 커스텀 훅(fetch를 함수화), useQuery는 캐싱
    // 비동기 함수를 실행하기 전에 cache에서 key를 가져와서 컴포넌트에게 전달한다. 비동기함수는 백그라운드에서 실행
    // 변경된 데이터가 있으면 다시 반영을 시켜줌

    // useParams : url 경로에서 모든 파라미터 값을 저장한 객체를 반환한다.
    const {id} = useParams();
    console.log('- bookables id',typeof id)   // bookables 의 id는 문자열
    console.log('- BookablesView bookables-',bookables)

    // url 경로에서 가져온 id 값과 bookables 의 id가 같은 것을 bookable 에 저장
    const bookable = bookables.find(b => b.id === parseInt(id,10)) || bookables[0];

    if (status === "error") {
        return <p>{error.message}</p>
    }

    if (status === "loading") {
        return <PageSpinner/>
    }

    return (
        <main className="bookables-page">
            <div>
                <BookablesList bookable={bookable} bookables={bookables} getUrl={id => `/bookables/${id}`}/>
                <p className="controls">
                    <Link to="/bookables/new" replace={true} className="btn">
                        <FaPlus/>
                        <span>New</span>
                    </Link>
                </p>
            </div>
            <BookableDetails bookable={bookable}/>
        </main>
    );

    //   bookable state 상태 변화는 자식 컴포넌트에서 발생하고
    //   변경된 상태를 부모에게로 전달. - BookablesList 형제 컴포넌트 BookableDetails
    //   BookableDetails 도 변경되 상태값으로 재렌더링
}
import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import loadData from "../utils/api.js";
import BookableForm from "./BookableForm.jsx";
import {useEffect, useState} from "react";
import PageSpinner from "../UI/PageSpinner.jsx";

export default function BookableEdit(){
    const {id} = useParams();
    const queryClient = useQueryClient();
    
    const {data, status, isLoading} = useQuery(
        ["bookable", id],
        () => loadData(`http://localhost:3001/bookables/${id}`),
        {
            initialData: queryClient.getQueriesData("bookables")?.find(
                b => b.id === parseInt(id, 10)
            )
        } // initialData 설정 옵션 : 캐시 만료, 데이터 읽기 지연(오류) 문제를 해결하는 초기값
          // fetch 문제. "bookables" 이름의 캐시값을 가져와서 id와 같은 것으로 data를 초기화
    )

    const [state, setState] = useState()
    useEffect( () => {
        if(data) {
            setState(data)
        }
    }, [data]);

    if(isLoading) {
        return <PageSpinner/>
    }
    console.log("--BookableEdit data", data)
    // state는 화면에 보여질 값들을 저장함
    return (
        status === "success" && <BookableForm formState={{state, setState}}/>
    )
}
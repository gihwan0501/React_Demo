import BookablesView from "./BookablesView.jsx"
import {Route, Routes} from "react-router-dom";
import BookableEdit from "./BookableEdit.jsx";
import BookableNew from "./BookableNew.jsx";

export default function BookablesPage () {
    return (
       <Routes>
           {/* id 식별값을 경로에 포함시키기 (rest api 방식)
                path 속성에는 /bookable url 뒤에 나오는 부분만 값을 작성한다.*/}
           <Route path="/:id" element={<BookablesView/>}></Route>
           <Route path="/" element={<BookablesView/>}></Route>
           <Route path="/:id/edit" element={<BookableEdit/>}></Route>
           <Route path="/new" element={<BookableNew/>}></Route>
       </Routes>
    );
}

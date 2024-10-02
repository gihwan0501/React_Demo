// 초기 App.jsx
import './App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {FaCalendarAlt, FaDoorOpen, FaUsers} from "react-icons/fa";
import UserPicker from "./component/Users/UserPicker.jsx";
import BookablePage from "./component/Bookables/BookablePage.jsx";
import UserPage from "./component/Users/UsersPage.jsx";
import BookingsPage from "./component/Bookings/BookingsPage.jsx";

// index.html이 처름 요청으로 반환되는 페이지
// html은 더 만들지 않는다. : SinglePageApplication(SPA)
// index.html -> main.jsx(index.js) 실행
function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/bookings" className="btn">
                                    <FaCalendarAlt/>
                                    <span>예약하기</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/bookables" className="btn">
                                    <FaDoorOpen/>
                                    <span>예약 자원</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/users" className="btn">
                                    <FaUsers/>
                                    <span>사용자</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <UserPicker/>
                </header>
                {/* 사용자 선택한 메뉴 항목에 따라 화면에 보이는 UI를 결정한다. */}
                <Routes>
                    <Route path="/bookings" element={<BookingsPage/>}></Route>
                    <Route path="/bookables" element={<BookablePage/>}></Route>
                    <Route path="/users" element={<UserPage/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
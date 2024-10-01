// 초기 App.jsx
import './App.css'
import Garage, {Car} from "./basic/List.jsx";
import GarageKorean from "./basic/Objects.jsx";
// index.html이 처름 요청으로 반환되는 페이지
// html은 더 만들지 않는다. : SinglePageApplication(SPA)
// index.html -> main.jsx(index.js) 실행
function App() {

  return (
    <>  
        {/*brand 임의의 프로퍼티 설정*/}
        <Car brand="소나타"/>
        <Garage/>
        <GarageKorean/>
    </>
  )
}

export default App

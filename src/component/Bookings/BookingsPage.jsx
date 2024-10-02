import WeekPicker from "./WeekPicker.jsx";

function BookingsPage() {
    return (
        <main className="bookings-page">
            {/*<WeekPicker date="" day ="" month =""/>
                WeekPicker에서 받을 값이 3개* -> 함수에서 props로 받거나
                또는 오브젝트를 분해하여 {date, day, month}로 가능
            */}
            {/* WeekPicher에게 초기값으로 date 속성을 전달한다. */}
            <WeekPicker date={new Date()}/>
        </main>
    )
}

export default BookingsPage
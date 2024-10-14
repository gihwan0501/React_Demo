import {useEffect, useReducer, useState} from "react";
import getWeek from "../utils/date-utils.js";
import weekReducer from './weekReducer.js'
import WeekPicker from "./WeekPicker.jsx";
import BookingDetails from "./BookingDetails.jsx";
import BookingsGrid from "./BookingsGrid.jsx";
import {useBookings} from "./bookingHooks.js";

export default function Bookings({bookable}){
    const [week, dispatch] = useReducer(
        weekReducer,new Date(), getWeek
    )
    // 예약 정보 저장. BookingsGrid UI 에서 한칸(cell) 선택하면 booking 변경
    const [booking, setBooking] = useState(null)
    // bookings를 fetch하고 cache에 저장
    const {bookings} = useBookings(bookable?.id, week.start, week.end)
    // state 상태값 booking을 selectBooking으로 할당
    const selectBooking = bookings?.[booking?.session]?.[booking.date]

    useEffect(() => {   // 새로운 예약
        setBooking(null)
    }, [bookable, week.start]);

    useEffect(() => {   // 새로운 예약
        if(booking?.id !== undefined && !selectBooking) {
            selectBooking(null)
        }
    }, [booking, selectBooking]);

    return (
        <div className="bookings">
            <div>
                <WeekPicker week={week} dispatch={dispatch}/>
                <BookingsGrid week={week} bookable={bookable} booking={booking} setBooking={setBooking}/>
            </div>
                <BookingDetails week={week} booking={selectBooking || booking} bookable={bookable}/>
        </div>
    )
}
import {useState, useMemo, useEffect} from "react";
import {getGrid, transformBookings} from "./grid-builder.js";
import {getBookings} from "../utils/api.js";
import Spinner from "../UI/Spinner.jsx";
import {formatDateDay} from '../utils/date-utils.js'
import {useBookings} from "./bookingHooks.js";

export default function BookingsGrid ({week, bookable, booking, setBooking}){

    /*const [bookings, setBookings] = useState(null)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // 비용(시간) 이 높은 함수 getGrid 를 useMemo 훅 사용하기
    //  네트워크 지연시 시간이 오래 걸릴 getGrid 함수를 메모화
    const {grid, sessions, dates}=  useMemo(
        () => bookable ? getGrid(bookable, week.start) : {},
        [bookable,week.start]
    )*/

    const {bookings, status, error} = useBookings(
        bookable?.id, week.start, week.end)

   /* useEffect(() => {
        setLoading(true)
        if (bookable) {
            let doUpdate = true;

            setBookings(null);
            setError(false);
            setBooking(null);*/
    const {grid, sessions, dates} = useMemo(() =>
        bookable ? getGrid(bookable, week.start) : {},
        [bookable, week.start]
    );
        /* getBookings(bookable.id, week.start, week.end)
                .then(resp => {
                    if (doUpdate) {
                        setBookings(transformBookings(resp));
                    }
                    setLoading(false)
                    // console.log('g-2',bookings)
                })
                .catch(setError);

            return () => doUpdate = false;
        }
    }, [week, bookable, setBooking]);*/

    function cell (session, date) {
        const cellData = bookings?.[session]?.[date] || grid[session][date];

        const isSelected = booking?.session === session
            && booking?.date === date;

        return (
            <td key={date} className={isSelected ? "selected" : null}
                onClick={status === "success" ? () => setBooking(cellData) : null}>
                {/*onClick={bookings ? () => setBooking(cellData) : null}*/}
                {cellData.title}
            </td>
        );
    }

    if (!grid) {
        return <p>Waiting for bookable and details</p>
    }


    return (
        <>
            {status === "error" && (
                <p className="bookingsError">
                    {`There was a problem loading the bookings data (${error})`}
                </p>
            )}
            <table className={status === "success" ? "bookingsGrid active" : "bookingsGrid"}>
            {/*<table className={bookings? "bookingsGrid active":"bookingsGrid"}*/}
                <thead>
                <tr>
                    <th>
                        <span className="status">
                         {!dates && <Spinner/>}
                        </span>
                    </th>
                    {dates && dates.map(d => (
                        <th key={d}>
                            {formatDateDay(new Date(d))}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {sessions && sessions.map(session => (
                    <tr key={session}>
                        <th>{session}</th>
                        {dates.map(date => cell(session, date))}
                        {/* 위의 cell 함수 실행으로 반환된 td 요소 출력*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}
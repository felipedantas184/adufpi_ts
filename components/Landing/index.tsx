import List from "./List";
import { useState } from "react";
import moment from "moment";

const Landing = ({ rooms }: any) => {
  const [availableRooms, setAvailableRooms] = useState<any>(rooms)
  const [fromdate, setfromdate] = useState<any>()
  const [todate, settodate] = useState<any>()
  const [totaldays, settotaldays] = useState<number>(0)

  const convertDate = (date:any) => {
    const [day, month, year] = date.split('-');
    const result = [year, month, day].join('-');

    return result
  }

  function filterByDate(dates:any, datesString:any) {
    setfromdate(datesString[0])
    settodate(datesString[1])
    if (moment.duration(moment(datesString[1], 'DD-MM-YYYY').diff(moment(datesString[0], 'DD-MM-YYYY'))).asDays() == 0) {
      settotaldays(1)
    } else {
      settotaldays(moment.duration(moment(datesString[1], 'DD-MM-YYYY').diff(moment(datesString[0], 'DD-MM-YYYY'))).asDays())
    }

    var temprooms = rooms;
    for (const room of rooms) {
      var availability = true;
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          if (
            moment(convertDate(datesString[0])).isBetween(convertDate(booking.fromdate), convertDate(booking.todate)) ||
            moment(convertDate(datesString[1])).isBetween(convertDate(booking.fromdate), convertDate(booking.todate)) ||
            moment(convertDate(booking.fromdate)).isBetween(moment(convertDate(datesString[0])), moment(convertDate(datesString[1]))) ||
            moment(convertDate(booking.todate)).isBetween(moment(convertDate(datesString[0])), moment(convertDate(datesString[1]))) ||
            datesString[0] == booking.fromdate ||
            datesString[0] == booking.todate ||
            datesString[1] == booking.fromdate ||
            datesString[1] == booking.todate
          ) {
            availability = false
          }
        }
      }
      if (availability == false) {
        temprooms = temprooms.filter((item:any) => item.id !== room.id)
      }
      setAvailableRooms(temprooms)
    }
  }


  return ( 
    <List availableRooms={availableRooms} totaldays={totaldays} filterByDate={filterByDate} fromdate={fromdate} todate={todate}/>
   );
}
 
export default Landing;
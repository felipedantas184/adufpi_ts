import Bookings from "@/components/Bookings";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout/Layout";
import { collection, getDocs } from "firebase/firestore";

export async function getServerSideProps() {
  const firebaseRooms = await getDocs(collection(fireDB, "rooms"));
  const rooms:any = []
  firebaseRooms.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data()
    }

    rooms.push(obj)
  });

  return {
    props: {
      rooms
    }
  }
}

const BookingsPage = ({ rooms }:any) => {
  return ( 
    <Layout>
      <Bookings rooms={rooms} />
    </Layout>
   );
}
 
export default BookingsPage;
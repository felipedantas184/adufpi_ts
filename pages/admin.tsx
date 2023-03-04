import Admin from "@/components/Admin";
import { useAuth } from "@/context/AuthContext";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from 'react'

export async function getServerSideProps() {
  const firebaseBookings = await getDocs(collection(fireDB, "bookings"));
  const bookings:any = []
  firebaseBookings.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data()
    }

    bookings.push(obj)
  });

  const firebaseRooms = await getDocs(collection(fireDB, "rooms"));
  const rooms:any = []
  firebaseRooms.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data()
    }

    rooms.push(obj)
  });

  const firebaseUsers = await getDocs(collection(fireDB, "users"));
  const users:any = []
  firebaseUsers.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data()
    }

    users.push(obj)
  });

  return {
    props: {
      bookings,
      rooms,
      users
    }
  }
}

const AdminPage = ({ bookings, rooms, users }:any) => {
  const router = useRouter()
  const { user } = useAuth()

  const userData = users.filter((u:any) => u.id == user?.uid)
  const adminPrivilege = userData[0].admin

  useEffect(() => {
    console.log(adminPrivilege)
    if (!adminPrivilege) {
      router.push('/')
    }
  }, [adminPrivilege, router])


  return ( 
    <Layout>
      <Admin bookings={bookings} rooms={rooms} users={users} />
    </Layout>
   );
}
 
export default AdminPage;
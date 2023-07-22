import UserAdmin from "@/components/UsersAdmin";
import { useAuth } from "@/context/AuthContext";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from 'react'

export async function getServerSideProps() {
  const firebaseBookings = await getDocs(collection(fireDB, "bookings"));
  const bookings: any = []
  firebaseBookings.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data()
    }

    bookings.push(obj)
  });

  const firebaseRooms = await getDocs(collection(fireDB, "rooms"));
  const rooms: any = []
  firebaseRooms.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data()
    }

    rooms.push(obj)
  });

  const firebaseUsers = await getDocs(collection(fireDB, "users"));
  const users: any = []
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

const UsersAdminPage = ({ bookings, rooms, users }: any) => {
  const router = useRouter()
  const { user } = useAuth()

  const userData = users.filter((u: any) => u.id == user?.uid)
  const adminPrivilege = userData[0].admin

  useEffect(() => {
    if (!adminPrivilege) {
      router.push('/')
    }
  }, [adminPrivilege, router])

  return (
    <>
      <Head>
        <title>Painel Administrativo ADUFPI | Apartamentos</title>
        <meta name="description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Painel Administrativo ADUFPI | Apartamentos" />
        <meta property="og:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:site_name" content="Painel Administrativo ADUFPI | Apartamentos" />

        <meta property="twitter:title" content="Painel Administrativo ADUFPI | Apartamentos" />
        <meta property="twitter:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="twitter:image" content="/apple-touch-icon.png" />
      </Head>
      <Layout>
        {(adminPrivilege) && (
          <UserAdmin bookings={bookings} rooms={rooms} users={users} />
        )}
      </Layout>
    </>
  );
}

export default UsersAdminPage;
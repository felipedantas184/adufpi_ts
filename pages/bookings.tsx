import Bookings from "@/components/Bookings";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";

export async function getServerSideProps() {
  const firebaseRooms = await getDocs(collection(fireDB, "rooms"));
  const rooms: any = []
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

const BookingsPage = ({ rooms }: any) => {
  return (
    <>
      <Head>
        <title>Minhas Reservas ADUFPI | Apartamentos</title>
        <meta name="description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Minhas Reservas ADUFPI | Apartamentos" />
        <meta property="og:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:site_name" content="Minhas Reservas ADUFPI | Apartamentos" />

        <meta property="twitter:title" content="Minhas Reservas ADUFPI | Apartamentos" />
        <meta property="twitter:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="twitter:image" content="/apple-touch-icon.png" />
      </Head>
      <Layout>
        <Bookings rooms={rooms} />
      </Layout>
    </>
  );
}

export default BookingsPage;
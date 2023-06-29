import Checkout from "@/components/Checkout";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout/Layout";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Head from "next/head";

export const getServerSideProps = async (context: any) => {
  const id = context.params.id;
  const data = await getDoc(doc(fireDB, "rooms", id));
  const room = data.data()

  return {
    props: {
      room: room,
      roomId: id,
    }
  }
}

const CheckoutPage = ({ room, roomId }: any) => {
  return (
    <>
      <Head>
        <title>Checkout ADUFPI | Apartamentos</title>
        <meta name="description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Checkout ADUFPI | Apartamentos" />
        <meta property="og:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:site_name" content="Checkout ADUFPI | Apartamentos" />

        <meta property="twitter:title" content="Checkout ADUFPI | Apartamentos" />
        <meta property="twitter:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="twitter:image" content="/apple-touch-icon.png" />
      </Head>
      <Layout>
        <Checkout room={room} roomId={roomId} />
      </Layout>
    </>
  );
}

export default CheckoutPage;
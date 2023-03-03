import Checkout from "@/components/Checkout";
import fireDB from "@/firebase/initFirebase";
import Layout from "@/layout/Layout";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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

const CheckoutPage = ({ room, roomId }:any ) => {
  return ( 
    <Layout>
      <Checkout room={room} roomId={roomId} />
    </Layout>
   );
}
 
export default CheckoutPage;
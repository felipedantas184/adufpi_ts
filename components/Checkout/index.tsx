import { useAuth } from "@/context/AuthContext";
import fireDB from "@/firebase/initFirebase";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { BData, Boxes, BResume, Button, CBox, CLabel, CName, Container, Cost, CTitle, HBox, Heading, ImgWrap, Info, Title, Wrapper } from "./CheckoutStyles";

const Checkout = ({ room, roomId }:any) => {
  const { user } = useAuth();
  const router = useRouter();
  const { from, to, totaldays } = router.query;

  async function adddata() {
    try {
      await addDoc(collection(fireDB, "bookings"), {
        userId: user?.uid,
        from: from,
        to: to,
        roomId: roomId,
        bookingdate: 'now',
        amount: room.price,
        payment: 'Pendente',
        status: 'Pendente'
      }).then(function (docRef) {
        updateDoc(doc(fireDB, "rooms", roomId), {
          currentBookings: arrayUnion({ fromdate: from, todate: to, bookingId: docRef.id })
        })
      })

      alert("Reserva feita com sucesso")
      router.push({ pathname: '/bookings' })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Heading>
          <Title></Title>
          <Cost></Cost>
        </Heading>
        <Info>
          <ImgWrap><Image src={'/images/banner.png'} alt="Room" fill /></ImgWrap>
          <Boxes>
            <BData>
              <CTitle>Confirmação</CTitle>
              <CBox>
                <CLabel>Nome</CLabel>
                <CName>{user?.displayName}</CName>
              </CBox>
              <CBox>
                <CLabel>E-mail</CLabel>
                <CName>{user?.email}</CName>
              </CBox>
              <HBox>
                <CBox>
                  <CLabel>Quarto</CLabel>
                  <CName>{room.title}</CName>
                </CBox>
                <CBox>
                  <CLabel>Capacidade</CLabel>
                  <CName>{room.capacity}</CName>
                </CBox>
              </HBox>
              <HBox>
                <CBox>
                  <CLabel>Check-In</CLabel>
                  <CName>{from}</CName>
                </CBox>
                <CBox>
                  <CLabel>Check-Out</CLabel>
                  <CName>{to}</CName>
                </CBox>
              </HBox>
            </BData>
            <BResume>
              <HBox>
                <CLabel style={{alignSelf: 'flex-end', fontWeight: 600}}>Valor</CLabel>
                <CBox>
                  <CName style={{textAlign: 'right'}}>{totaldays} Diárias</CName>
                  <CName style={{textAlign: 'right', fontWeight: 600}}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price)}</CName>
                </CBox>
              </HBox>
              <Button onClick={() => adddata()}>Confirmar Reserva</Button>
            </BResume>
          </Boxes>
          <CName>Resume about the room and a bunch of features of each room. Resume about the room and a bunch of features of each room. Resume about the room and a bunch of features of each room</CName>
          <CName>Resume about the room and a bunch of features of each room.</CName>
        </Info>
      </Wrapper>
    </Container>
  );
}

export default Checkout;
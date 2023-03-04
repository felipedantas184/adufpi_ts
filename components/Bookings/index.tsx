import Image from "next/image";
import { Button, Card, Cards, CFooter, CLabel, Container, CResume, CTitle, Details, DText, FText, Group, Heading, ImgWrap, Info, Subtitle, Text, Title, Wrapper } from "./BookignsStyles";
import { FiUsers } from 'react-icons/fi'
import { useEffect, useState } from "react";
import { arrayRemove, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";
import { useAuth } from "@/context/AuthContext";
import moment from "moment";
import { sendCancelationMessage } from "@/lib/api";

const Bookings = ({ rooms }: any) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getBookings() {
      const bookings: any = []
      const q = query(collection(fireDB, "bookings"), where("userId", "==", user?.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data()
        }
        bookings.push(obj)
      })

      setBookings(bookings)
      setLoading(false)
    }

    getBookings()
  }, [user])

  const getRoomName = (roomId: string) => {
    const room = rooms.filter((room: any) => room.id == roomId)
    const roomName = (room[0].title)

    return roomName
  }
  const getRoomImage = (roomId: string) => {
    const room = rooms.filter((room: any) => room.id == roomId)
    const roomImage = (room[0].imageurl)

    return roomImage
  }
  const getRoomCapacity = (roomId: string) => {
    const room = rooms.filter((room: any) => room.id == roomId)
    const roomImage = (room[0].capacity)

    return roomImage
  }
  function byDate(a:any, b:any) {
    //chronologically by year, month, then day
    return new Date(a.from.split('-').reverse().join()).valueOf() - new Date(b.from.split('-').reverse().join()).valueOf(); //timestamps
  }


  async function deleteData(bookingId:string, roomId:string, bookingFrom:string, bookingTo:string, bookingAmount:number, bookingUserId:string) {
    try {
      if (confirm("Você tem certeza de que deseja cancelar esta reserva?") == true) {
        if (moment.duration((moment(bookingFrom, 'DD-MM-YYYY').diff(moment(moment().utcOffset('-03:00').format('DD-MM-YYYY'), 'DD-MM-YYYY')))).asDays() > 0) {
          await deleteDoc(doc(fireDB, "bookings", bookingId)).then(function() {
            updateDoc(doc(fireDB, "rooms", roomId), {
              currentBookings: arrayRemove({
                bookingId: bookingId,
                fromdate: bookingFrom,
                todate: bookingTo
              })
            })
            sendCancelationMessage({
              name: user?.displayName,
              email: user?.email,
              subject: 'Reserva Cancelada com Sucesso - ADUFPI',
              from: bookingFrom,
              to: bookingTo,
              room: getRoomName(roomId),
              amount: Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(bookingAmount),
              bookingId: bookingId
            })
          })
          alert("Reserva cancelada!")
          location.reload()
        } else {
          alert('Não é possível cancelar reservas passadas.')
        }
      }
    } catch (error) {
      alert(error)
    }
  }

  
  return (
    <Container>
      <Wrapper>
        <Heading>
          <Title>Apartamentos ADUFPI</Title>
          <Subtitle>Selecione as datas da hospedagem</Subtitle>
        </Heading>
        {(!loading) ? (
          <Cards>
            {bookings.sort(byDate).map((booking: any) => (
              <Card key={booking.id} >
                <ImgWrap><Image src={getRoomImage(booking.roomId)} alt={getRoomName(booking.roomId)} fill /></ImgWrap>
                <Text>
                  <Details>
                    <CTitle>{getRoomName(booking.roomId)}</CTitle>
                    <DText>{getRoomCapacity(booking.roomId)}<FiUsers size={14} color={'#EB5757'} /></DText>
                  </Details>
                  <Info>
                    <Group>
                      <CLabel>Nome</CLabel>
                      <CResume>{user?.displayName}</CResume>
                    </Group>
                    <Group>
                      <CLabel>E-mail</CLabel>
                      <CResume>{user?.email}</CResume>
                    </Group>
                    <Group>
                      <CLabel>Check-In</CLabel>
                      <CResume>{booking.from}</CResume>
                    </Group>
                    <Group>
                      <CLabel>Check-Out</CLabel>
                      <CResume>{booking.to}</CResume>
                    </Group>
                  </Info>
                </Text>
                <CFooter>
                  <FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(booking.amount)}</FText>
                  <Button onClick={() => deleteData(booking.id, booking.roomId, booking.from, booking.to, booking.amount, booking.userId)}>Cancelar Reserva</Button>
                </CFooter>
              </Card>
            ))}
          </Cards>
        ) : (
          <h1>Carregando</h1>
        )}
      </Wrapper>
    </Container>
  );
}

export default Bookings;
import { FaEdit, FaSave } from "react-icons/fa";
import { Box, BoxSubtitle, BoxTitle, Container, DetailsItem, DetailsRow, Group, Half, HeaderItem, HeaderItemSmall, HeaderItemSmallAction, Heading, Subtitle, Table, TableHeader, TableItem, TableItemSmall, TableItemSmallAction, TableRow, TableWrapper, Title, Wrapper } from "./RoomAdminStyles";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";
import moment from 'moment';
import { Button } from "../Bookings/BookignsStyles";


const RoomAdmin = ({ bookings, rooms, users }: any) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().utcOffset('-03:00').format('DD-MM-YYYY hh:mm:ss a').slice(3, 10))
  const [editingBooking, setEditingBooking] = useState<any>()
  const [updatePayment, setUpdatePayment] = useState<string>()
  const [updateStatus, setUpdateStatus] = useState<string>()

  const [coupleGuest, setCoupleGuest] = useState<string>('120')
  const [coupleMember, setCoupleMember] = useState<string>('60')
  const [coletiveGuest, setcoletiveGuest] = useState<string>('70')
  const [coletiveMember, setcoletiveMember] = useState<string>('35')
  const [editingCoupleRoom, setEditingCoupleRoom] = useState<boolean>(false)
  const [editingColetiveRoom, setEditingColetiveRoom] = useState<boolean>(false)

  async function bookingEdit(booking: any) {
    setEditingBooking(booking)
  }
  async function CoupleRoomEdit() {
    setEditingCoupleRoom(true)
  }
  async function ColetiveRoomEdit() {
    setEditingColetiveRoom(true)
  }

  async function updateData(bookingId: string) {
    try {
      if (confirm("Você tem certeza de que deseja atualizar esta reserva?") == true) {
        (updatePayment && updateStatus) ? (
          await updateDoc(doc(fireDB, "bookings", bookingId), {
            payment: updatePayment,
            status: updateStatus
          })
        ) : (updatePayment && !updateStatus) ? (
          await updateDoc(doc(fireDB, "bookings", bookingId), {
            payment: updatePayment
          })
        ) : (!updatePayment && updateStatus) ? (
          await updateDoc(doc(fireDB, "bookings", bookingId), {
            status: updateStatus
          })
        ) : (!updatePayment && !updateStatus) ? (
          alert('Não há nada para atualizar')
        ) : (alert('Nada para realizar'))
        alert("Reserva atualizada!")
        location.reload()
      }
    } catch (error) {
      alert(error)
    }
  }

  async function UpdateCoupleRooms() {
    rooms.sort(byName).filter((item: any) => item.title.slice(6, 11) == 'Casal').map(async (room: any) => {
      try {
        await updateDoc(doc(fireDB, "rooms", room.id), {
          guestprice: coupleGuest,
          price: coupleMember,
        })
        console.log("atualizando")
      } catch (error) {
        console.log(error)
      }
    })
    setEditingCoupleRoom(false)
    setTimeout(function(){
      window.location.reload();
    }, 3000)
  }

  async function UpdateColetiveRooms() {
    rooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva').map(async (room: any) => {
      try {
        await updateDoc(doc(fireDB, "rooms", room.id), {
          guestprice: coletiveGuest,
          price: coletiveMember,
        })
        console.log("atualizando")
      } catch (error) {
        console.log(error)
      }
    })
    setEditingColetiveRoom(false)
    setTimeout(function(){
      window.location.reload();
    }, 3000)
  }

  async function UpdateColetiveRoomsCapacity() {
    rooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva').map(async (room: any) => {
      try {
        await updateDoc(doc(fireDB, "rooms", room.id), {
          capacity: "1",
        })
        console.log("atualizando")
      } catch (error) {
        console.log(error)
      }
    })
  }

  async function UpdateUsers() {
    users.map(async (user: any) => {
      try {
        await updateDoc(doc(fireDB, "users", user.id), {
          able: true,
        })
        console.log("atualizando")
      } catch (error) {
        console.log(error)
      }
    })
  }

  function byName(a: any, b: any) {
    if (a.slug < b.slug) { return -1; }
    if (a.slug > b.slug) { return 1; }
    return 0;
  }

  return (
    <Container>
      <Wrapper>
        <Heading>
          <Title>Administração</Title>
          <Subtitle>Confira os dados das suítes</Subtitle>
        </Heading>

        <Box>
          <Half>
            <BoxTitle>Suítes Coletivas</BoxTitle>
            <Group>
              <BoxSubtitle>Sócio</BoxSubtitle>
              {(editingColetiveRoom) ? (
                <input type="number"
                  onChange={(e) =>
                    setcoletiveMember(e.target.value)
                  }
                  value={coletiveMember}
                />
              ) : (
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName)[0].price)}</BoxSubtitle>
              )}
            </Group>
            <Group>
              <BoxSubtitle>Convidado</BoxSubtitle>
              {(editingColetiveRoom) ? (
                <input type="number"
                  onChange={(e) =>
                    setcoletiveGuest(e.target.value)
                  }
                  value={coletiveGuest}
                />
              ) : (
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName)[0].guestprice)}</BoxSubtitle>
              )}
            </Group>
            {(editingColetiveRoom) ? (
              <Button onClick={() => { UpdateColetiveRooms() }} style={{ width: '50%', backgroundColor: 'green' }}>Confirmar</Button>
            ) : (
              <Button onClick={() => { ColetiveRoomEdit() }} style={{ width: '50%' }}>Editar</Button>
            )}
          </Half>
          <Half>
            <BoxTitle>Suítes Casal</BoxTitle>
            <Group>
              <BoxSubtitle>Sócio</BoxSubtitle>
              {(editingCoupleRoom) ? (
                <input type="number"
                  onChange={(e) =>
                    setCoupleMember(e.target.value)
                  }
                  value={coupleMember}
                />) : (
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName)[33].price)}</BoxSubtitle>
              )}
            </Group>
            <Group>
              <BoxSubtitle>Convidado</BoxSubtitle>
              {(editingCoupleRoom) ? (
                <input type="number"
                  onChange={(e) =>
                    setCoupleGuest(e.target.value)
                  }
                  value={coupleGuest}
                />) : (
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName)[33].guestprice)}</BoxSubtitle>
              )}
            </Group>
            {(editingCoupleRoom) ? (
              <Button onClick={() => { UpdateCoupleRooms() }} style={{ width: '50%', backgroundColor: 'green' }}>Confirmar</Button>
            ) : (
              <Button onClick={() => { CoupleRoomEdit() }} style={{ width: '50%' }}>Editar</Button>
            )}          </Half>
        </Box>

        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderItem>Nome</HeaderItem>
              <HeaderItemSmall>Convidado</HeaderItemSmall>
              <HeaderItemSmall>Sócio</HeaderItemSmall>
              <HeaderItemSmall>Capacidade</HeaderItemSmall>
            </TableHeader>
            {rooms.sort(byName).filter((item: any) => item.title.slice(6, 11) == 'Casal').map((room: any) => (
              <>
                <TableRow key={room.id} >
                  <TableItem style={{ justifyContent: 'flex-start', fontWeight: 500 }} >{room.title}</TableItem>
                  <TableItemSmall>{room.guestprice}</TableItemSmall>
                  <TableItemSmall>{room.price}</TableItemSmall>
                  <TableItemSmall>{room.capacity}</TableItemSmall>
                </TableRow>
                <DetailsRow>
                  <DetailsItem>Observações: {room.resume}</DetailsItem>
                </DetailsRow>
              </>
            ))}
          </Table>
        </TableWrapper>
        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderItem>Nome</HeaderItem>
              <HeaderItemSmall>Convidado</HeaderItemSmall>
              <HeaderItemSmall>Sócio</HeaderItemSmall>
              <HeaderItemSmall>Capacidade</HeaderItemSmall>
            </TableHeader>
            {rooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva').map((room: any) => (
              <>
                <TableRow key={room.id} >
                  <TableItem style={{ justifyContent: 'flex-start', fontWeight: 500 }} >{room.title}</TableItem>
                  <TableItemSmall>{room.guestprice}</TableItemSmall>
                  <TableItemSmall>{room.price}</TableItemSmall>
                  <TableItemSmall>{room.capacity}</TableItemSmall>
                </TableRow>
                <DetailsRow>
                  <DetailsItem>Observações: {room.resume}</DetailsItem>
                </DetailsRow>
              </>
            ))}
          </Table>
        </TableWrapper>
        {(editingBooking) && (
          <TableWrapper>
            <Table>
              <TableHeader style={{ backgroundColor: '#EC5757' }} >
                <HeaderItem>Nome</HeaderItem>
                <HeaderItemSmall>Convidado</HeaderItemSmall>
                <HeaderItemSmall>Sócio</HeaderItemSmall>
                <HeaderItemSmall>Capacidade</HeaderItemSmall>
                <HeaderItemSmallAction>Ação</HeaderItemSmallAction>
              </TableHeader>
              <TableRow>
                <TableItem>{editingBooking.title}</TableItem>
                <TableItemSmall>{editingBooking.guestprice}</TableItemSmall>
                <TableItemSmall>{editingBooking.price}</TableItemSmall>
                <TableItemSmall>{editingBooking.capacity}</TableItemSmall>
              </TableRow>
            </Table>
          </TableWrapper>
        )}
        <button onClick={() => UpdateCoupleRooms()} >ADD DATA</button>
        <button onClick={() => UpdateColetiveRooms()} >ADD DATA</button>
        <button onClick={() => UpdateColetiveRoomsCapacity()} >ADD DATA</button>
        <button onClick={() => UpdateUsers()} >ADD DATA</button>
      </Wrapper>
    </Container>
  );
}

export default RoomAdmin;
import { FaEdit, FaSave } from "react-icons/fa";
import { Container, DetailsItem, DetailsRow, HeaderItem, HeaderItemSmall, HeaderItemSmallAction, Heading, Subtitle, Table, TableHeader, TableItem, TableItemSmall, TableItemSmallAction, TableRow, TableWrapper, Title, Wrapper } from "./UsersAdminStyles";
import { useState } from "react";
import { arrayRemove, doc, updateDoc, deleteDoc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";
import moment from 'moment';


const UserAdmin = ({ bookings, rooms, users }: any) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().utcOffset('-03:00').format('DD-MM-YYYY hh:mm:ss a').slice(3, 10))
  const [editingBooking, setEditingBooking] = useState<any>()
  const [updatePayment, setUpdatePayment] = useState<string>()
  const [updateStatus, setUpdateStatus] = useState<string>()

  const onChange = (date: any, dateString: string) => {
    setSelectedMonth(dateString)
  };

  function byDate(a: any, b: any) {
    return new Date(a.from.split('-').reverse().join()).valueOf() - new Date(b.from.split('-').reverse().join()).valueOf(); //timestamps
  }
  const getRoomName = (roomId: string) => {
    const room = rooms.filter((room: any) => room.id == roomId)
    const roomName = (room[0].title)

    return roomName
  }
  const getUserName = (userId: string) => {
    const user = users.filter((user: any) => user.id == userId)
    const userName = (user[0].name + ' ' + user[0].surname)

    return userName
  }
  async function bookingEdit(booking: any) {
    setEditingBooking(booking)
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
  async function deleteData(bookingId: string, roomId: string, bookingFrom: string, bookingTo: string) {
    try {
      if (confirm("Você tem certeza de que deseja cancelar esta reserva?" + roomId) == true) {
        await deleteDoc(doc(fireDB, "bookings", bookingId)).then(function () {
          updateDoc(doc(fireDB, "rooms", roomId), {
            currentBookings: arrayRemove({
              bookingId: bookingId,
              fromdate: bookingFrom,
              todate: bookingTo
            })
          })
        })
        alert("Reserva cancelada!")
        location.reload()
      }
    } catch (error) {
      alert(error)
    }
  }

  async function UpdateRooms() {
    rooms.sort(byName).filter((item: any) => item.title.slice(6, 11) == 'Casal').map(async (room: any) => {
      try {
        await updateDoc(doc(fireDB, "rooms", room.id), {
          guestprice: "120",
          price: "60",
        })
        console.log("atualizando")
      } catch (error) {
        console.log(error)
      }
    })
  }

  async function UpdateColetiveRooms() {
    rooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva').map(async (room: any) => {
      try {
        await updateDoc(doc(fireDB, "rooms", room.id), {
          guestprice: "70",
          price: "35",
        })
        console.log("atualizando")
      } catch (error) {
        console.log(error)
      }
    })
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

  const getTotalAmount = () => {
    const filteredMonth = bookings.filter((item: any) => item.from.slice(3, 10) == selectedMonth)
    const value = filteredMonth.reduce((prev: any, curr: any) => prev + curr.amount, 0)

    return value
  }

  const getTotalPaidAmount = () => {
    const filteredMonth = bookings.filter((item: any) => item.from.slice(3, 10) == selectedMonth && item.status == 'Pago')
    const value = filteredMonth.reduce((prev: any, curr: any) => prev + curr.amount, 0)

    return value
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
          <Subtitle>Você está vendo as reservas referentes a {selectedMonth}</Subtitle>
        </Heading>
        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderItem>Nome</HeaderItem>
              <HeaderItem>CPF</HeaderItem>
              <HeaderItem>E-mail</HeaderItem>
              <HeaderItem>Telefone</HeaderItem>
              <HeaderItem>Status</HeaderItem>
              <HeaderItemSmallAction>Ação</HeaderItemSmallAction>
            </TableHeader>
            {users.sort(byName).map((user: any) => (
              <>
                <TableRow key={user.id} >
                  <TableItem style={{ justifyContent: 'flex-start', fontWeight: 500 }} >{user.name} {user.surname}</TableItem>
                  <TableItem>{user.cpf}</TableItem>
                  <TableItem>{user.email}</TableItem>
                  <TableItem>{user.phone}</TableItem>
                  <TableItem>{user.able ? 'habilitado' : 'false'}</TableItem>
                  <TableItemSmallAction style={{ gap: 8 }}>
                    <FaEdit style={{ cursor: 'pointer' }} size={16} color={'#C4C4C4'} onClick={() => bookingEdit(user)} />
                  </TableItemSmallAction>
                </TableRow>
                <DetailsRow>
                  <DetailsItem>Observações: {user.resume}</DetailsItem>
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
                <HeaderItem>CPF</HeaderItem>
                <HeaderItem>E-mail</HeaderItem>
                <HeaderItem>Telefone</HeaderItem>
                <HeaderItem>Status</HeaderItem>
                <HeaderItemSmallAction>Ação</HeaderItemSmallAction>
              </TableHeader>
              <TableRow>
                <TableItem style={{ justifyContent: 'flex-start', fontWeight: 500 }} >{editingBooking.name} {editingBooking.surname}</TableItem>
                <TableItem>{editingBooking.cpf}</TableItem>
                <TableItem>{editingBooking.email}</TableItem>
                <TableItem>{editingBooking.phone}</TableItem>
                <TableItem>
                <select defaultValue={editingBooking.status}
                    onChange={(e) =>
                      setUpdateStatus(e.target.value)
                    }>
                    <option value={'able'}>Habilitado</option>
                    <option value={'no'}>Não Habilitado</option>
                  </select>
                </TableItem>
                <TableItemSmall style={{ justifyContent: 'space-around' }}>
                  <FaSave style={{ cursor: 'pointer' }} size={16} color={'#02AD50'} onClick={() => updateData(editingBooking.id)} />
                </TableItemSmall>
              </TableRow>
            </Table>
          </TableWrapper>
        )}
        <button onClick={() => UpdateRooms()} >ADD DATA</button>
        <button onClick={() => UpdateColetiveRooms()} >ADD DATA</button>
        <button onClick={() => UpdateColetiveRoomsCapacity()} >ADD DATA</button>
        <button onClick={() => UpdateUsers()} >ADD DATA</button>
      </Wrapper>
    </Container>
  );
}

export default UserAdmin;
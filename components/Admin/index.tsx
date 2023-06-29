import { FaEdit, FaSave } from "react-icons/fa";
import { MdOutlineCancel } from 'react-icons/md'
import { Container, DetailsItem, DetailsRow, HeaderItem, HeaderItemSmall, Heading, Subtitle, Table, TableHeader, TableItem, TableItemSmall, TableRow, TableWrapper, Title, Wrapper } from "./AdminStyles";
import { useState } from "react";
import { arrayRemove, doc, updateDoc, deleteDoc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";

import { DatePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/pt_BR';
import moment from 'moment';


const Admin = ({ bookings, rooms, users }: any) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().utcOffset('-03:00').format('DD-MM-YYYY hh:mm:ss a').slice(3, 10))
  const [editingBooking, setEditingBooking] = useState<any>()
  const [updatePayment, setUpdatePayment] = useState<string>()
  const [updateStatus, setUpdateStatus] = useState<string>()

  const onChange = (date:any, dateString:string) => {
    setSelectedMonth(dateString)
  };

  function byDate(a:any, b:any) {
    return new Date(a.from.split('-').reverse().join()).valueOf() - new Date(b.from.split('-').reverse().join()).valueOf(); //timestamps
  } 
  const getRoomName = (roomId:string) => {
    const room = rooms.filter((room:any) => room.id == roomId)
    const roomName = (room[0].title)

    return roomName
  }
  const getUserName = (userId:string) => {
    const user = users.filter((user:any) => user.id == userId)
    const userName = (user[0].name + ' ' + user[0].surname)

    return userName
  }
  async function bookingEdit(booking:any) {
    setEditingBooking(booking)
  }
  async function updateData(bookingId:string) {
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
  async function deleteData(bookingId:string, roomId:string, bookingFrom:string, bookingTo:string) {
    try {
      if (confirm("Você tem certeza de que deseja cancelar esta reserva?" + roomId) == true) {
        await deleteDoc(doc(fireDB, "bookings", bookingId)).then(function() {
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
  const getTotalAmount = () => {
    const filteredMonth = bookings.filter((item:any) => item.from.slice(3, 10) == selectedMonth)
    const value = filteredMonth.reduce((prev:any, curr:any) => prev + curr.amount, 0)

    return value
  }

  const getTotalPaidAmount = () => {
    const filteredMonth = bookings.filter((item:any) => item.from.slice(3, 10) == selectedMonth && item.status == 'Pago')
    const value = filteredMonth.reduce((prev:any, curr:any) => prev + curr.amount, 0)

    return value
  }

  return (
    <Container>
      <Wrapper>
        <Heading>
          <Title>Administração</Title>
          <Subtitle>Você está vendo as reservas referentes a {selectedMonth}</Subtitle>
          <DatePicker picker="month" inputReadOnly={true} format="MM-YYYY" locale={locale} allowClear={false} onChange={onChange} />
        </Heading>
        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderItem>Nome</HeaderItem>
              <HeaderItemSmall>Quarto</HeaderItemSmall>
              <HeaderItemSmall>Check-In</HeaderItemSmall>
              <HeaderItemSmall>Check-Out</HeaderItemSmall>
              <HeaderItemSmall>Valor Total</HeaderItemSmall>
              <HeaderItemSmall>Pagamento</HeaderItemSmall>
              <HeaderItemSmall>Status</HeaderItemSmall>
              <HeaderItemSmall>Ação</HeaderItemSmall>
            </TableHeader>
            {bookings.sort(byDate).filter((item:any) => item.from.slice(3, 10) == selectedMonth)
            .map((booking:any) => (
              <>
              <TableRow key={booking.id} >
                <TableItem style={{justifyContent: 'flex-start', fontWeight: 500}} >{getUserName(booking.userId)}</TableItem>
                <TableItemSmall>{getRoomName(booking.roomId)}</TableItemSmall>
                <TableItemSmall>{booking.from}</TableItemSmall>
                <TableItemSmall>{booking.to}</TableItemSmall>
                <TableItemSmall>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(booking.amount)}</TableItemSmall>
                <TableItemSmall>{booking.payment}</TableItemSmall>
                <TableItemSmall>{booking.status}</TableItemSmall>
                <TableItemSmall style={{ gap: 8 }}>
                  <MdOutlineCancel style={{ cursor: 'pointer' }} size={16} color={'#EC5757'} onClick={() => deleteData(booking.id, booking.roomId, booking.from, booking.to)} />
                  <FaEdit style={{ cursor: 'pointer' }} size={16} color={'#C4C4C4'} onClick={() => bookingEdit(booking)} />
                </TableItemSmall>
              </TableRow>
              <DetailsRow>
                <DetailsItem>Observações: {booking.details}</DetailsItem>
              </DetailsRow>
              </>
            ))}
          </Table>
        </TableWrapper>
        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderItem>Total de Reservas</HeaderItem>
              <HeaderItem>Valor Total Pago</HeaderItem>
              <HeaderItem>Valor Total Esperado</HeaderItem>
            </TableHeader>
            <TableRow>
              <TableItem>{bookings.sort(byDate).filter((item:any) => item.from.slice(3, 10) == selectedMonth).length}</TableItem>
              <TableItem>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(getTotalPaidAmount())}</TableItem>
              <TableItem>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(getTotalAmount())}</TableItem>
            </TableRow>
          </Table>
        </TableWrapper>
        {(editingBooking) && (
          <TableWrapper>
            <Table>
              <TableHeader style={{backgroundColor: '#EC5757'}} >
                <HeaderItem>Nome</HeaderItem>
                <HeaderItem>Quarto</HeaderItem>
                <HeaderItem>Check-In</HeaderItem>
                <HeaderItem>Check-Out</HeaderItem>
                <HeaderItem>Valor Total</HeaderItem>
                <HeaderItem>Pagamento</HeaderItem>
                <HeaderItemSmall>Status</HeaderItemSmall>
                <HeaderItemSmall>Ação</HeaderItemSmall>
              </TableHeader>
              <TableRow>
                <TableItem>{getUserName(editingBooking.userId)}</TableItem>
                <TableItem>{getRoomName(editingBooking.roomId)}</TableItem>
                <TableItem>{editingBooking.from}</TableItem>
                <TableItem>{editingBooking.to}</TableItem>
                <TableItem>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(editingBooking.amount)}</TableItem>
                <TableItem>
                  <select defaultValue={editingBooking.payment}
                    onChange={(e) =>
                      setUpdatePayment(e.target.value)
                    }>
                    <option value="Crédito" >Cartão Crédito</option>
                    <option value="Débito" >Cartão Débito</option>
                    <option value="Pendente" >Pendente</option>
                    <option value="Pix" >Pix</option>
                    <option value="Espécie" >Espécie</option>
                  </select>
                </TableItem>
                <TableItemSmall>
                  <select defaultValue={editingBooking.status}
                    onChange={(e) =>
                      setUpdateStatus(e.target.value)
                    }>
                    <option value="Pendente">Pendente</option>
                    <option value="Pago">Pago</option>
                  </select>
                </TableItemSmall>
                <TableItemSmall style={{ justifyContent: 'space-around' }}>
                  <FaSave style={{ cursor: 'pointer' }} size={16} color={'#02AD50'} onClick={() => updateData(editingBooking.id)} />
                </TableItemSmall>
              </TableRow>
            </Table>
          </TableWrapper>
        )}
      </Wrapper>
    </Container>
  );
}

export default Admin;
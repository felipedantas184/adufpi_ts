import { FaArrowAltCircleRight, FaEdit, FaSave } from "react-icons/fa";
import { MdOutlineCancel } from 'react-icons/md'
import { Container, DetailsItem, DetailsRow, HeaderItem, HeaderItemSmall, HeaderItemSmallAction, Heading, Subtitle, Table, TableHeader, TableItem, TableItemSmall, TableItemSmallAction, TableRow, TableWrapper, Title, Wrapper } from "./AdminStyles";
import { useState } from "react";
import { arrayRemove, doc, updateDoc, deleteDoc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";

const { RangePicker } = DatePicker;
import { DatePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/pt_BR';
import moment from 'moment';
import { sendCancelationMessage } from "@/lib/api";
import Link from "next/link";

const Admin = ({ bookings, rooms, users }: any) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().utcOffset('-03:00').format('DD-MM-YYYY hh:mm:ss a').slice(3, 10))
  const [selectedFilter, setSelectedFilter] = useState<any>()
  const [editingBooking, setEditingBooking] = useState<any>()
  const [updatePayment, setUpdatePayment] = useState<string>()
  const [updateStatus, setUpdateStatus] = useState<string>()
  const [updateAmount, setUpdateAmount] = useState<number>()
  const [filteredBookings, setFilteredBookings] = useState<any>(bookings)

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
  const getUserEmail = (userId: string) => {
    const user = users.filter((user: any) => user.id == userId)
    const userEmail = (user[0].email)

    return userEmail
  }
  async function bookingEdit(booking: any) {
    setEditingBooking(booking)
  }
  async function updateData(bookingId: string) {
    try {
      if (confirm("Você tem certeza de que deseja atualizar esta reserva?") == true) {
        (updatePayment && updateStatus && updateAmount) ? (
          await updateDoc(doc(fireDB, "bookings", bookingId), {
            payment: updatePayment,
            status: updateStatus,
            amount: updateAmount
          })
        ) : (updatePayment && !updateStatus && !updateAmount) ? (
          await updateDoc(doc(fireDB, "bookings", bookingId), {
            payment: updatePayment
          })
        ) : (!updatePayment && updateStatus && !updateAmount) ? (
          await updateDoc(doc(fireDB, "bookings", bookingId), {
            status: updateStatus
          })
        ) : (!updatePayment && !updateStatus && updateAmount) ? (
          await updateDoc(doc(fireDB, "bookings", bookingId), {
            amount: updateAmount
          })
        ) : (updatePayment && updateStatus && !updateAmount) ? (
          await updateDoc(doc(fireDB, "bookings", bookingId), {
            payment: updatePayment,
            status: updateStatus
          })
        ) : (!updatePayment && updateStatus && updateAmount) ? (
          await updateDoc(doc(fireDB, "bookings", bookingId), {
            status: updateStatus,
            amount: updateAmount
          })
        ) : (updatePayment && !updateStatus && updateAmount) ? (
          await updateDoc(doc(fireDB, "bookings", bookingId), {
            payment: updatePayment,
            amount: updateAmount
          })
        ) : (!updatePayment && !updateStatus && !updateAmount) ? (
          alert('Não há nada para atualizar')
        ) : (alert('Nada para realizar'))
        alert("Reserva atualizada!")
        location.reload()
      }
    } catch (error) {
      alert(error)
    }
  }
  async function deleteData(bookingId: string, roomId: string, bookingFrom: string, bookingTo: string, bookingUserId: string, bookingAmount: number) {
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
          sendCancelationMessage({
            name: getUserName(bookingUserId),
            email: getUserEmail(bookingUserId),
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
      }
    } catch (error) {
      alert(error)
    }
  }
  const getTotalAmount = () => {
    const value = filteredBookings.filter((selectedFilter === 'Pago') ? ((item:any) => item.status == 'Pago') : (selectedFilter === 'Pendente') ? ((item:any) => item.status == 'Pendente') : ((item:any) => (item.status == 'Pago' || item.status == "Pendente"))).reduce((prev: any, curr: any) => prev + curr.amount, 0)

    return value
  }
  const getTotalPaidAmount = () => {
    const paidBookings = filteredBookings.filter((selectedFilter === 'Pago') ? ((item:any) => item.status == 'Pago') : (selectedFilter === 'Pendente') ? ((item:any) => item.status == 'Pendente') : ((item:any) => (item.status == 'Pago' || item.status == "Pendente")))
    const value = paidBookings.filter((item: any) => item.status == 'Pago').reduce((prev: any, curr: any) => prev + curr.amount, 0)

    return value
  }
  const convertDate = (date: any) => {
    const [day, month, year] = date.split('-');
    const result = [year, month, day].join('-');

    return result
  }
  function filterByDate(dates: any, datesString: any) {
    console.log(convertDate(datesString[0]))
    console.log(convertDate(datesString[1]))
    console.log(moment('2023-08-06').isBetween(convertDate(datesString[0]), convertDate(datesString[1])))
    var tempbookings = bookings;
    for (const booking of bookings) {
      var availability = false;
      if (
        moment(convertDate(booking.from)).isBetween(convertDate(datesString[0]), convertDate(datesString[1])) ||
        moment(convertDate(booking.to)).isBetween(convertDate(datesString[0]), convertDate(datesString[1])) ||
        moment(convertDate(datesString[0])).isBetween(convertDate(booking.from), convertDate(booking.to)) ||
        moment(convertDate(datesString[1])).isBetween(convertDate(booking.from), convertDate(booking.to)) ||
        datesString[0] == booking.fromdate ||
        datesString[0] == booking.todate ||
        datesString[1] == booking.fromdate ||
        datesString[1] == booking.todate
      ) {
        availability = true
      }
      if (availability == false) {
        tempbookings = tempbookings.filter((item: any) => item.id !== booking.id)
      }
      setFilteredBookings(tempbookings)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Heading>
          <Title>Administração</Title>
          <Subtitle>Você está vendo as reservas referentes a {selectedMonth}</Subtitle>
          <RangePicker format="DD-MM-YYYY" inputReadOnly={true} onChange={filterByDate} locale={locale} allowClear={false} />
          <select defaultValue={selectedFilter}
            onChange={(e) =>
              setSelectedFilter(e.target.value)
            }>
            <option value="all" >Todos</option>
            <option value="Pago" >Pago</option>
            <option value="Pendente" >Pendente</option>
          </select>
          <TableItem><Link style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8}} href={'admin-quartos'}>Alterar valor das diárias<FaArrowAltCircleRight size={16} color="#000" /></Link></TableItem>
          <TableItem><Link style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8}} href={'admin-users'}>Habilitar usuários a realizar reservas<FaArrowAltCircleRight size={16} color="#000" /></Link></TableItem>
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
              <HeaderItemSmallAction>Ação</HeaderItemSmallAction>
            </TableHeader>
            {filteredBookings.sort(byDate).filter((selectedFilter === 'Pago') ? ((item:any) => item.status == 'Pago') : (selectedFilter === 'Pendente') ? ((item:any) => item.status == 'Pendente') : ((item:any) => (item.status == 'Pago' || item.status == "Pendente"))).map((booking: any) => (
              <>
                <TableRow key={booking.id} >
                  <TableItem style={{ justifyContent: 'flex-start', fontWeight: 500 }} >{getUserName(booking.userId)}</TableItem>
                  <TableItemSmall>{getRoomName(booking.roomId)}</TableItemSmall>
                  <TableItemSmall>{booking.from}</TableItemSmall>
                  <TableItemSmall>{booking.to}</TableItemSmall>
                  <TableItemSmall>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(booking.amount)}</TableItemSmall>
                  <TableItemSmall>{booking.payment}</TableItemSmall>
                  <TableItemSmall>{booking.status}</TableItemSmall>
                  <TableItemSmallAction style={{ gap: 8 }}>
                    <MdOutlineCancel style={{ cursor: 'pointer' }} size={16} color={'#EC5757'} onClick={() => deleteData(booking.id, booking.roomId, booking.from, booking.to, booking.userId, booking.amount)} />
                    <FaEdit style={{ cursor: 'pointer' }} size={16} color={'#C4C4C4'} onClick={() => bookingEdit(booking)} />
                  </TableItemSmallAction>
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
              <TableItem>{filteredBookings.filter((selectedFilter === 'Pago') ? ((item:any) => item.status == 'Pago') : (selectedFilter === 'Pendente') ? ((item:any) => item.status == 'Pendente') : ((item:any) => (item.status == 'Pago' || item.status == "Pendente"))).sort(byDate).length}</TableItem>
              <TableItem>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(getTotalPaidAmount())}</TableItem>
              <TableItem>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(getTotalAmount())}</TableItem>
            </TableRow>
          </Table>
        </TableWrapper>
        {(editingBooking) && (
          <TableWrapper>
            <Table>
              <TableHeader style={{ backgroundColor: '#EC5757' }} >
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
                <TableItem>
                  <input style={{ width: '100%', textAlign: 'center' }} type="number" placeholder={editingBooking.amount}
                    onChange={(e) =>
                      setUpdateAmount(Number(e.target.value))
                    }
                    value={updateAmount}
                  />
                </TableItem>
                <TableItem>
                  <select defaultValue={editingBooking.payment}
                    onChange={(e) =>
                      setUpdatePayment(e.target.value)
                    }>
                    <option value="Débito em Conta" >Débito em Conta</option>
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
import { FaEdit, FaSave } from "react-icons/fa";
import { Container, DetailsItem, DetailsRow, HeaderItem, HeaderItemSmall, HeaderItemSmallAction, Heading, Subtitle, Table, TableHeader, TableItem, TableItemSmall, TableItemSmallAction, TableRow, TableWrapper, Title, Wrapper } from "./UsersAdminStyles";
import { useState } from "react";
import { arrayRemove, doc, updateDoc, deleteDoc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";
import moment from 'moment';


const UserAdmin = ({ users }: any) => {
  const [editingBooking, setEditingBooking] = useState<any>()
  const [updateStatus, setUpdateStatus] = useState<string>()

  async function bookingEdit(booking: any) {
    setEditingBooking(booking)
  }

  async function UpdateUsers(user: any) {
    try {
      if (updateStatus == 'able') {
        await updateDoc(doc(fireDB, "users", user.id), {
          able: true,
        })
        alert("Usuário habilitado para realizar reservas!")
      } else {
        await updateDoc(doc(fireDB, "users", user.id), {
          able: false,
        })
        alert("Usuário não pode realizar mais reservas!")
      }
    } catch (error) {
      console.log(error)
    }
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
          <Subtitle>Você pode habilitar os usuários a realizar reservas!</Subtitle>
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
                  <TableItem>{user.able ? 'Habilitado' : 'Restrito'}</TableItem>
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
                    <option hidden>-Selecione-</option>
                    <option value={'able'}>Habilitado</option>
                    <option value={'not'}>Restrito</option>
                  </select>
                </TableItem>
                <TableItemSmall style={{ justifyContent: 'space-around' }}>
                  <FaSave style={{ cursor: 'pointer' }} size={16} color={'#02AD50'} onClick={() => UpdateUsers(editingBooking)} />
                </TableItemSmall>
              </TableRow>
            </Table>
          </TableWrapper>
        )}
      </Wrapper>
    </Container>
  );
}

export default UserAdmin;
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
  const [familyGuest, setfamilyGuest] = useState<string>('200')
  const [familyMember, setfamilyMember] = useState<string>('100')
  const [individualGuest, setindividualGuest] = useState<string>('100')
  const [individualMember, setindividualMember] = useState<string>('50')
  const [editingCoupleRoom, setEditingCoupleRoom] = useState<boolean>(false)
  const [editingColetiveRoom, setEditingColetiveRoom] = useState<boolean>(false)
  const [editingFamilyRoom, setEditingFamilyRoom] = useState<boolean>(false)
  const [editingIndividualRoom, setEditingIndividualRoom] = useState<boolean>(false)

  async function CoupleRoomEdit() {
    setEditingCoupleRoom(true)
  }
  async function ColetiveRoomEdit() {
    setEditingColetiveRoom(true)
  }
  async function IndividualRoomEdit() {
    setEditingIndividualRoom(true)
  }
  async function FamilyRoomEdit() {
    setEditingFamilyRoom(true)
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
    setTimeout(function () {
      window.location.reload();
    }, 3000)
  }

  async function UpdateColetiveRooms() {
    rooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva' && (item.title.slice(20, 29) == "Masculino" || item.title.slice(15, 17) == "12" || item.title.slice(15, 17) == "13")).map(async (room: any) => {
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
    setTimeout(function () {
      window.location.reload();
    }, 3000)
  }

  async function UpdateFamilyRooms() {
    rooms.sort(byName).filter((item: any) => item.title.slice(6, 13) == 'Família').map(async (room: any) => {
      try {
        await updateDoc(doc(fireDB, "rooms", room.id), {
          guestprice: familyGuest,
          price: familyMember,
        })
        console.log("atualizando")
      } catch (error) {
        console.log(error)
      }
    })
    setEditingFamilyRoom(false)
    setTimeout(function () {
      window.location.reload();
    }, 3000)
  }

  async function UpdateIndividualRooms() {
    rooms.sort(byName).filter((item: any) => item.title.slice(6, 16) == 'Individual').map(async (room: any) => {
      try {
        await updateDoc(doc(fireDB, "rooms", room.id), {
          guestprice: individualGuest,
          price: individualMember,
        })
        console.log("atualizando")
      } catch (error) {
        console.log(error)
      }
    })
    setEditingIndividualRoom(false)
    setTimeout(function () {
      window.location.reload();
    }, 3000)
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
            <BoxTitle>Suítes Família</BoxTitle>
            <Group>
              <BoxSubtitle>Sócio</BoxSubtitle>
              {(editingFamilyRoom) ? (
                <input type="number"
                  onChange={(e) =>
                    setfamilyMember(e.target.value)
                  }
                  value={familyMember}
                />
              ) : (
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName).filter((item: any) => item.title.slice(6, 13) == 'Família')[0].price)}</BoxSubtitle>
              )}
            </Group>
            <Group>
              <BoxSubtitle>Convidado</BoxSubtitle>
              {(editingFamilyRoom) ? (
                <input type="number"
                  onChange={(e) =>
                    setfamilyGuest(e.target.value)
                  }
                  value={familyGuest}
                />
              ) : (
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName).filter((item: any) => item.title.slice(6, 13) == 'Família')[0].guestprice)}</BoxSubtitle>
              )}
            </Group>
            {(editingFamilyRoom) ? (
              <Button onClick={() => { UpdateFamilyRooms() }} style={{ width: '50%', backgroundColor: 'green' }}>Confirmar</Button>
            ) : (
              <Button onClick={() => { FamilyRoomEdit() }} style={{ width: '50%' }}>Editar</Button>
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
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName).filter((item: any) => item.title.slice(6, 11) == 'Casal')[0].price)}</BoxSubtitle>
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
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName).filter((item: any) => item.title.slice(6, 11) == 'Casal')[0].guestprice)}</BoxSubtitle>
              )}
            </Group>
            {(editingCoupleRoom) ? (
              <Button onClick={() => { UpdateCoupleRooms() }} style={{ width: '50%', backgroundColor: 'green' }}>Confirmar</Button>
            ) : (
              <Button onClick={() => { CoupleRoomEdit() }} style={{ width: '50%' }}>Editar</Button>
            )}
          </Half>
        </Box>

        <Box>
          <Half>
            <BoxTitle>Suítes Individuais</BoxTitle>
            <Group>
              <BoxSubtitle>Sócio</BoxSubtitle>
              {(editingIndividualRoom) ? (
                <input type="number"
                  onChange={(e) =>
                    setindividualMember(e.target.value)
                  }
                  value={individualMember}
                />
              ) : (
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName).filter((item: any) => item.title.slice(6, 16) == 'Individual')[0].price)}</BoxSubtitle>
              )}
            </Group>
            <Group>
              <BoxSubtitle>Convidado</BoxSubtitle>
              {(editingIndividualRoom) ? (
                <input type="number"
                  onChange={(e) =>
                    setindividualGuest(e.target.value)
                  }
                  value={individualGuest}
                />
              ) : (
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName).filter((item: any) => item.title.slice(6, 16) == 'Individual')[0].guestprice)}</BoxSubtitle>
              )}
            </Group>
            {(editingIndividualRoom) ? (
              <Button onClick={() => { UpdateIndividualRooms() }} style={{ width: '50%', backgroundColor: 'green' }}>Confirmar</Button>
            ) : (
              <Button onClick={() => { IndividualRoomEdit() }} style={{ width: '50%' }}>Editar</Button>
            )}
          </Half>
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
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva')[0].price)}</BoxSubtitle>
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
                <BoxSubtitle>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(rooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva')[0].guestprice)}</BoxSubtitle>
              )}
            </Group>
            {(editingColetiveRoom) ? (
              <Button onClick={() => { UpdateColetiveRooms() }} style={{ width: '50%', backgroundColor: 'green' }}>Confirmar</Button>
            ) : (
              <Button onClick={() => { ColetiveRoomEdit() }} style={{ width: '50%' }}>Editar</Button>
            )}
          </Half>
        </Box>

        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderItem>Nome</HeaderItem>
              <HeaderItemSmall>Convidado</HeaderItemSmall>
              <HeaderItemSmall>Sócio</HeaderItemSmall>
              <HeaderItemSmall>Capacidade</HeaderItemSmall>
            </TableHeader>
            {rooms.sort(byName).sort(byName).filter((item: any) => item.title.slice(6, 13) == 'Família').map((room: any) => (
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
            {rooms.sort(byName).sort(byName).filter((item: any) => item.title.slice(6, 16) == 'Individual').map((room: any) => (
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
            {rooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva' && item.title.slice(20, 28) == "Feminino").map((room: any) => (
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
            {rooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva' && (item.title.slice(20, 29) == "Masculino" || item.title.slice(15, 17) == "12" || item.title.slice(15, 17) == "13")).map((room: any) => (
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
      </Wrapper>
    </Container>
  );
}

export default RoomAdmin;
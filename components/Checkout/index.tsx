import { useAuth } from "@/context/AuthContext";
import fireDB from "@/firebase/initFirebase";
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { BData, Boxes, BResume, Button, CBox, CLabel, CName, Container, Cost, CTitle, HBox, Heading, ImgWrap, Info, Input, Title, Wrapper } from "./CheckoutStyles";
import { sendContactForm } from "../../lib/api";
import moment from "moment";
import { useEffect, useState } from "react";

const Checkout = ({ room, roomId }: any) => {
  const { user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>()
  const [paymentMethod, setPaymentMethod] = useState<string>('Débito em Conta - Pendente')
  const [bookingDetails, setBookingDetails] = useState<string>()
  const [secondGuest, setSecondGuest] = useState<string>()
  const [bookingContact, setBookingContact] = useState<string>()
  const [secondContact, setSecondContact] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)
  const { from, to } = router.query;
  var totaldays = moment.duration(moment(to, 'DD-MM-YYYY').diff(moment(from, 'DD-MM-YYYY'))).asDays()
  if (totaldays == 0) {
    totaldays = 1
  }
  async function adddata() {
    try {
      await addDoc(collection(fireDB, "bookings"), {
        userId: user?.uid,
        from: from,
        to: to,
        roomId: roomId,
        bookingdate: moment().utcOffset('-03:00').format('DD-MM-YYYY hh:mm:ss a'),
        amount: (userData.relation === 'member') ? (room.price * totaldays) : (room.guestprice * totaldays),
        payment: paymentMethod,
        details: `${bookingDetails} - ${bookingContact} ${(secondGuest) ? `//  ${secondGuest} - ${secondContact}` : ''}`,
        status: 'Pendente'
      }).then(function (docRef) {
        updateDoc(doc(fireDB, "rooms", roomId), {
          currentBookings: arrayUnion({ fromdate: from, todate: to, bookingId: docRef.id })
        })
        sendContactForm({
          name: user?.displayName,
          email: user?.email,
          subject: 'Reserva Realizada com Sucesso - ADUFPI',
          from: from,
          to: to,
          room: room.title,
          amount: (userData.relation === 'member') ? (Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price * totaldays)) : (Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice * totaldays)),
          bookingId: docRef.id,
          observations: 'OS APARTAMENTOS COLETIVOS SÃO COMPARTILHADOS E UM NOVO HÓSPEDE PODE SER INCLÚIDO NO APARTAMENTO A QUALQUER MOMENTO.   a.	Não servimos café da manhã; b.	Não aceitamos pets; c.	Não nos responsabilizamos pela segurança dos veículos e objetos deixados no seu interior; d.	Estacionamento gratuito; e.	WIFI gratuito; f.	Horário do Checkin 14h00 e Checkout 12h00; g.	Favor trazer este email com a confirmação de reserva para apresentar à Portaria, principalmente se o checkin for fora do horário comercial; h.	Cancelamentos só serão aceitos com um dia de antecedência; i.	Permanência máxima de 15 dias; j.	Hospedagem permitida exclusivamente de associados, parentes em 1º grau e professores de outras IES; k.	Havendo mudança de apartamento coletivo para individual os valores serão recalculados;'
        })
      })

      alert("Reserva feita com sucesso")
      router.push({ pathname: '/bookings' })
    } catch (error) {
      alert(error)
    }
  }

  console.log(user)

  useEffect(() => {
    async function getBookings() {
      if (user !== null) {
        const data = await getDoc(doc(fireDB, "users", user?.uid));
        const userData = data.data()

        setUserData(userData)
        setLoading(false)
      }
    }

    getBookings()
  }, [user])

  return (
    <Container>
      <Wrapper>
        <Heading>
          <Title>{room.title}</Title>
          {(!loading) ? (
            (userData.relation === 'member') ? (
              <Cost>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price)}/diária</Cost>
            ) : (<Cost>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice)}/diária</Cost>)
          ) : (<></>)}
        </Heading>
        <Info>
          <ImgWrap><Image src={room.imageurl} alt={room.title} fill /></ImgWrap>
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
              <CBox>
                <select style={{ fontFamily: 'Poppins', borderRadius: 8 }}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }>
                  <option value="Débito em Conta - Pendente">Débito em Conta</option>
                  <option value="Cartão Crédito - Pendente">Cartão Crédito</option>
                  <option value="Cartão Débito - Pendente">Cartão Débito</option>
                  <option value="Pix - Pendente">Pix</option>
                  <option value="Espécie - Pendente">Espécie</option>
                </select>
              </CBox>
              <HBox style={{ gap: 4 }} >
                <CBox>
                  <CLabel>Nome do Hóspede</CLabel>
                  <Input placeholder="João da Silva" maxLength={50}
                    onChange={(e) =>
                      setBookingDetails(e.target.value)
                    }
                    value={bookingDetails} />
                </CBox>
                <CBox>
                  <CLabel>Telefone</CLabel>
                  <Input placeholder="86 99981-1520" maxLength={20} type="number"
                    onChange={(e) =>
                      setBookingContact(e.target.value)
                    }
                    value={bookingContact} />
                </CBox>
              </HBox>
              {(room.capacity == 2) ? (
                <HBox style={{ gap: 4 }} >
                  <CBox>
                    <CLabel>Nome do Hóspede</CLabel>
                    <Input placeholder="João da Silva" maxLength={50}
                      onChange={(e) =>
                        setSecondGuest(e.target.value)
                      }
                      value={secondGuest} />
                  </CBox>
                  <CBox>
                    <CLabel>Telefone</CLabel>
                    <Input placeholder="86 99981-1520" maxLength={20} type="number"
                      onChange={(e) =>
                        setSecondContact(e.target.value)
                      }
                      value={secondContact} />
                  </CBox>
                </HBox>
              ) : (
                <></>
              )}
            </BData>
            <BResume>
              <HBox>
                <CLabel style={{ alignSelf: 'flex-end', fontWeight: 600 }}>Valor</CLabel>
                <CBox>
                  <CName style={{ textAlign: 'right' }}>{totaldays} Diárias</CName>
                  <CName style={{ textAlign: 'right', fontWeight: 600 }}>
                    {(!loading) ? (
                      (userData.relation === 'member') ? (Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price * totaldays)) : (Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice * totaldays))
                    ) : (<></>)}
                  </CName>
                </CBox>
              </HBox>
              <Button onClick={() => adddata()}>Confirmar Reserva</Button>
            </BResume>
          </Boxes>
          <CName>As reservas estão sujeitas às regras contidas na página principal. Suítes coletivas podem ser ocupadas a qualquer momento por outros hóspedes.</CName>
          <CName><b>As suítes coletivas devem ser reservadas para uma ÚNICA pessoa.</b></CName>
          <CName>{room.description}</CName>
        </Info>
      </Wrapper>
    </Container>
  );
}

export default Checkout;
import { useAuth } from "@/context/AuthContext";
import fireDB from "@/firebase/initFirebase";
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { BData, Boxes, BResume, Button, CBox, CLabel, CName, Container, Cost, CTitle, HBox, Heading, ImgWrap, Info, Input, Title, Wrapper } from "./CheckoutStyles";
import { sendContactForm } from "../../lib/api";
import moment from "moment";
import { useEffect, useState } from "react";
import Link from "next/link";

const Checkout = ({ room, roomId }: any) => {
  const { user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>()
  const [paymentMethod, setPaymentMethod] = useState<string>('Débito em Conta - Pendente')
  const [bookingDetails, setBookingDetails] = useState<string>()
  const [firstRelation, setFirstRelation] = useState<string>()
  const [secondGuest, setSecondGuest] = useState<string>()
  const [secondRelation, setSecondRelation] = useState<string>()
  const [thirdGuest, setThirdGuest] = useState<string>()
  const [thirdRelation, setThirdRelation] = useState<string>()
  const [fourthGuest, setFourthGuest] = useState<string>()
  const [fourthRelation, setFourthRelation] = useState<string>()
  const [bookingContact, setBookingContact] = useState<string>()
  const [secondContact, setSecondContact] = useState<string>()
  const [thirdContact, setthirdContact] = useState<string>()
  const [fourthContact, setFourthContact] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)
  const [contractChecked, setContractChecked] = useState<boolean>(false)

  const { from, to } = router.query;
  var totaldays = moment.duration(moment(to, 'DD-MM-YYYY').diff(moment(from, 'DD-MM-YYYY'))).asDays()
  if (totaldays == 0) {
    totaldays = 1
  }

  const convertDate = (date: any) => {
    const [day, month, year] = date.split('-');
    const result = [year, month, day].join('-');

    return result
  }

  async function adddata() {
    const data = await getDoc(doc(fireDB, "rooms", roomId));
    const validateRoom = data.data()

    console.log(validateRoom)

    var availability = true;
    if (validateRoom?.currentBookings.length > 0) {
      for (const booking of validateRoom?.currentBookings) {
        if (
          moment(convertDate(from)).isBetween(convertDate(booking.fromdate), convertDate(booking.todate)) ||
          moment(convertDate(to)).isBetween(convertDate(booking.fromdate), convertDate(booking.todate)) ||
          moment(convertDate(booking.fromdate)).isBetween(moment(convertDate(from)), moment(convertDate(to))) ||
          moment(convertDate(booking.todate)).isBetween(moment(convertDate(from)), moment(convertDate(to))) ||
          from == booking.fromdate ||
          from == booking.todate ||
          to == booking.fromdate ||
          to == booking.todate
        ) {
          availability = false
        }
      }
    }
    if (availability == false) {
      alert("RESERVA NÃO MAIS DISPONÍVEL")
      router.push({ pathname: '/' })
    } else {
      try {
        await addDoc(collection(fireDB, "bookings"), {
          userId: user?.uid,
          from: from,
          to: to,
          roomId: roomId,
          bookingdate: moment().utcOffset('-03:00').format('DD-MM-YYYY hh:mm:ss a'),
          amount: (room.capacity >= 2) ? (firstRelation === 'convidado' && secondRelation === 'convidado') ? (room.guestprice * totaldays) : (room.price * totaldays) : (firstRelation === 'convidado') ? (room.guestprice * totaldays) : (room.price * totaldays),
          payment: paymentMethod,
          details: `${bookingDetails}, ${firstRelation} - ${bookingContact} ${(secondGuest) ? ` //  ${secondGuest}, ${secondRelation} - ${secondContact}` : ''} ${(thirdGuest) ? ` //  ${thirdGuest}, ${thirdContact} - ${thirdRelation}` : ''} ${(fourthGuest) ? ` //  ${fourthGuest}, ${fourthContact} - ${fourthRelation}` : ''}`,
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


    {/**
      try {
      await addDoc(collection(fireDB, "bookings"), {
        userId: user?.uid,
        from: from,
        to: to,
        roomId: roomId,
        bookingdate: moment().utcOffset('-03:00').format('DD-MM-YYYY hh:mm:ss a'),
        amount: (room.capacity >= 2) ? (firstRelation === 'convidado' && secondRelation === 'convidado') ? (room.guestprice * totaldays) : (room.price * totaldays) : (firstRelation === 'convidado') ? (room.guestprice * totaldays) : (room.price * totaldays),
        payment: paymentMethod,
        details: `${bookingDetails}, ${firstRelation} - ${bookingContact} ${(secondGuest) ? ` //  ${secondGuest}, ${secondRelation} - ${secondContact}` : ''} ${(thirdGuest) ? ` //  ${thirdGuest}, ${thirdContact} - ${thirdRelation}` : ''} ${(fourthGuest) ? ` //  ${fourthGuest}, ${fourthContact} - ${fourthRelation}` : ''}`,
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
    }*/}
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
          {(room.capacity == 2) ? (
            (firstRelation && secondRelation) ? (
              (firstRelation === 'convidado' && secondRelation === 'convidado') ? <Cost>{(Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice))}/diária</Cost> : <Cost>{(Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price))}/diária</Cost>
            ) : (
              <span>...</span>
            )
          ) : (firstRelation) ? (
            (firstRelation === 'convidado') ? <Cost>{(Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice))}/diária</Cost> : <Cost>{(Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price))}/diária</Cost>
          ) : (
            <span>...</span>
          )
          }
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
                  <CLabel>Hóspede 1*</CLabel>
                  <Input placeholder="João da Silva" maxLength={50}
                    onChange={(e) =>
                      setBookingDetails(e.target.value)
                    }
                    value={bookingDetails} />
                </CBox>
                <CBox>
                  <CLabel>Telefone*</CLabel>
                  <Input placeholder="86 99981-1520" maxLength={20} type="number"
                    onChange={(e) =>
                      setBookingContact(e.target.value)
                    }
                    value={bookingContact} />
                </CBox>
              </HBox>
              <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', gap: 4 }} >
                <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                  <input type="radio" id="associado1" name="firstRelation" value="associado" onChange={(e) => setFirstRelation(e.target.value)} />
                  <label htmlFor="associado1" style={{ fontSize: 13 }} >Associado</label>
                </div>
                <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                  <input type="radio" id="dependente1" name="firstRelation" value="dependente" onChange={(e) => setFirstRelation(e.target.value)} />
                  <label htmlFor="dependente1" style={{ fontSize: 13 }} >Dependente</label>
                </div>
                <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                  <input type="radio" id="convidado1" name="firstRelation" value="convidado" onChange={(e) => setFirstRelation(e.target.value)} />
                  <label htmlFor="convidado1" style={{ fontSize: 13 }} >Convidado</label>
                </div>
              </div>
              {(room.capacity >= 2) ? (
                <>
                  <HBox style={{ gap: 4 }} >
                    <CBox>
                      <CLabel>Hóspede 2*</CLabel>
                      <Input placeholder="João da Silva" maxLength={50}
                        onChange={(e) =>
                          setSecondGuest(e.target.value)
                        }
                        value={secondGuest} />
                    </CBox>
                    <CBox>
                      <CLabel>Telefone*</CLabel>
                      <Input placeholder="86 99981-1520" maxLength={20} type="number"
                        onChange={(e) =>
                          setSecondContact(e.target.value)
                        }
                        value={secondContact} />
                    </CBox>
                  </HBox>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', gap: 4 }} >
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                      <input type="radio" id="associado2" name="secondRelation" value="associado" onChange={(e) => setSecondRelation(e.target.value)} />
                      <label htmlFor="associado2" style={{ fontSize: 13 }} >Associado</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                      <input type="radio" id="dependente2" name="secondRelation" value="dependente" onChange={(e) => setSecondRelation(e.target.value)} />
                      <label htmlFor="dependente2" style={{ fontSize: 13 }} >Dependente</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                      <input type="radio" id="convidado2" name="secondRelation" value="convidado" onChange={(e) => setSecondRelation(e.target.value)} />
                      <label htmlFor="convidado2" style={{ fontSize: 13 }} >Convidado</label>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {(room.capacity == 4) ? (
                <>
                  <HBox style={{ gap: 4 }} >
                    <CBox>
                      <CLabel>Hóspede 3</CLabel>
                      <Input placeholder="João da Silva" maxLength={50}
                        onChange={(e) =>
                          setThirdGuest(e.target.value)
                        }
                        value={thirdGuest} />
                    </CBox>
                    <CBox>
                      <CLabel>Telefone</CLabel>
                      <Input placeholder="86 99981-1520" maxLength={20} type="number"
                        onChange={(e) =>
                          setthirdContact(e.target.value)
                        }
                        value={thirdContact} />
                    </CBox>
                  </HBox>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', gap: 4 }} >
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                      <input type="radio" id="associado4" name="fourthRelation" value="associado" onChange={(e) => setFourthRelation(e.target.value)} />
                      <label htmlFor="associado4" style={{ fontSize: 13 }} >Associado</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                      <input type="radio" id="dependente4" name="fourthRelation" value="dependente" onChange={(e) => setFourthRelation(e.target.value)} />
                      <label htmlFor="dependente4" style={{ fontSize: 13 }} >Dependente</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                      <input type="radio" id="convidado4" name="fourthRelation" value="convidado" onChange={(e) => setFourthRelation(e.target.value)} />
                      <label htmlFor="convidado4" style={{ fontSize: 13 }} >Convidado</label>
                    </div>
                  </div>
                  <HBox style={{ gap: 4 }} >
                    <CBox>
                      <CLabel>Hóspede 4</CLabel>
                      <Input placeholder="João da Silva" maxLength={50}
                        onChange={(e) =>
                          setFourthGuest(e.target.value)
                        }
                        value={fourthGuest} />
                    </CBox>
                    <CBox>
                      <CLabel>Telefone</CLabel>
                      <Input placeholder="86 99981-1520" maxLength={20} type="number"
                        onChange={(e) =>
                          setFourthContact(e.target.value)
                        }
                        value={fourthContact} />
                    </CBox>
                  </HBox>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', gap: 4 }} >
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                      <input type="radio" id="associado3" name="thirdRelation" value="associado" onChange={(e) => setThirdRelation(e.target.value)} />
                      <label htmlFor="associado3" style={{ fontSize: 13 }} >Associado</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                      <input type="radio" id="dependente3" name="thirdRelation" value="dependente" onChange={(e) => setThirdRelation(e.target.value)} />
                      <label htmlFor="dependente3" style={{ fontSize: 13 }} >Dependente</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                      <input type="radio" id="convidado3" name="thirdRelation" value="convidado" onChange={(e) => setThirdRelation(e.target.value)} />
                      <label htmlFor="convidado3" style={{ fontSize: 13 }} >Convidado</label>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </BData>
            <BResume>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }} >
                <input type="checkbox" id="contract" onClick={() => setContractChecked(!contractChecked)} />
                <label htmlFor="contract" style={{ fontSize: 12 }}>Li e concordo com o <Link href={'/termos/contrato-de-estadia'} target="_blank"><i style={{ color: 'blueviolet' }} >contrato de estadia</i></Link></label>
              </div>
              <HBox>
                <CLabel style={{ alignSelf: 'flex-end', fontWeight: 600 }}>Valor</CLabel>
                <CBox>
                  <CName style={{ textAlign: 'right' }}>{totaldays} Diárias</CName>
                  <CName style={{ textAlign: 'right', fontWeight: 600 }}>
                    {(room.capacity >= 2) ? (
                      (firstRelation && secondRelation) ? (
                        (firstRelation === 'convidado' && secondRelation === 'convidado') ? (Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice * totaldays)) : (Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price * totaldays))
                      ) : (
                        <span>...</span>
                      )
                    ) : (firstRelation) ? (
                      (firstRelation === 'convidado') ? (Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice * totaldays)) : (Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price * totaldays))
                    ) : (
                      <span>...</span>
                    )}
                  </CName>
                </CBox>
              </HBox>
              {(room.capacity >= 2) ? (
                <Button disabled={totaldays >= 15 || !contractChecked || !bookingDetails || !bookingContact || !secondGuest || !firstRelation || !secondRelation} onClick={() => adddata()}>Confirmar Reserva</Button>
              ) : (
                <Button disabled={totaldays >= 15 || !contractChecked || !bookingDetails || !bookingContact || !firstRelation} onClick={() => adddata()}>Confirmar Reserva</Button>
              )}
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
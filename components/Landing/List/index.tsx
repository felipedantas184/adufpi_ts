import Image from "next/image";
import { Button, Card, Cards, CFooter, Container, CResume, CTitle, Details, DisabledButton, DText, FText, Heading, ImgWrap, Subtitle, Text, Title, Wrapper } from "./ListStyles";
import { FiUsers } from 'react-icons/fi'
import { useRouter } from "next/router";

import { DatePicker } from 'antd'
const { RangePicker } = DatePicker;
import locale from 'antd/lib/date-picker/locale/pt_BR';
import moment from 'moment';
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";


const List = ({ availableRooms, totaldays, filterByDate, fromdate, todate }: any) => {
  const router = useRouter()
  const { user } = useAuth()
  const [userData, setUserData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  const disabledDate = (current: any) => {
    return current && current < moment().startOf('day')
  };
  function sendData(room: any) {
    router.push({
      pathname: `/checkout/${room.id}`,
      query: {
        from: fromdate,
        to: todate
      }
    }, /**`/checkout/${room.id}`*/)
  }

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

  //FILTER//
  function byName(a: any, b: any) {
    if (a.slug < b.slug) { return -1; }
    if (a.slug > b.slug) { return 1; }
    return 0;
  }


  return (
    <Container>
      <Wrapper>
        <Heading>
          <Title>Apartamentos ADUFPI</Title>
          <Subtitle>Selecione as datas da hospedagem</Subtitle>
          <RangePicker format="DD-MM-YYYY" inputReadOnly={true} onChange={filterByDate} locale={locale} allowClear={false} disabledDate={disabledDate} />
        </Heading>

        <div style={{ alignSelf: 'flex-start', marginTop: 24}} >
          <Title style={{ fontSize: 20 }} >Suítes Família - Privativas</Title>
          <Subtitle style={{ fontSize: 16 }}>As suítes família não são compartilhadas com outros hóspedes.</Subtitle>
        </div>
        <Cards>
          {availableRooms.sort(byName).filter((item: any) => item.title.slice(6, 13) == 'Família').map((room: any) => (
            <Card key={room.id} >
              <ImgWrap><Image src={room.imageurl} alt={room.title} fill /></ImgWrap>
              <Text>
                {(!loading) ? (
                  <Details>
                    {(userData.relation === 'member') ? (
                      <DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price)}</DText>
                    ) : (<DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice)}</DText>)}
                    <DText>{room.capacity}<FiUsers size={14} color={'#EB5757'} /></DText>
                  </Details>
                ) : (<></>)}
                <CTitle>{room.title}</CTitle>
                <CResume>{room.resume}</CResume>
              </Text>
              {(!loading) ? (
                <CFooter>
                  {(userData.relation === 'member') ? (
                    <FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price * totaldays)}</FText>
                  ) : (<FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice * totaldays)}</FText>)}
                  {(totaldays == 0) ? (
                    <DisabledButton >Selecione as Datas</DisabledButton>
                  ) : (totaldays >= 15) ? (
                    <DisabledButton >Selecione novas Datas</DisabledButton>
                  ) : (userData.able == false) ? (
                    <DisabledButton >Usuário Não Habilitado</DisabledButton>
                  ) : (
                    <Button onClick={() => sendData(room)}>Reservar Agora</Button>
                  )}
                </CFooter>
              ) : (<></>)
              }
            </Card>
          ))}
        </Cards>

        <div style={{ alignSelf: 'flex-start', marginTop: 24}} >
          <Title style={{ fontSize: 20 }} >Suítes Casais - Privativas</Title>
          <Subtitle style={{ fontSize: 16 }}>As suítes casais não são compartilhadas com outros hóspedes.</Subtitle>
        </div>
        <Cards>
          {availableRooms.sort(byName).filter((item: any) => item.title.slice(6, 11) == 'Casal').map((room: any) => (
            <Card key={room.id} >
              <ImgWrap><Image src={room.imageurl} alt={room.title} fill /></ImgWrap>
              <Text>
                {(!loading) ? (
                  <Details>
                    {(userData.relation === 'member') ? (
                      <DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price)}</DText>
                    ) : (<DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice)}</DText>)}
                    <DText>{room.capacity}<FiUsers size={14} color={'#EB5757'} /></DText>
                  </Details>
                ) : (<></>)}
                <CTitle>{room.title}</CTitle>
                <CResume>{room.resume}</CResume>
              </Text>
              {(!loading) ? (
                <CFooter>
                  {(userData.relation === 'member') ? (
                    <FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price * totaldays)}</FText>
                  ) : (<FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice * totaldays)}</FText>)}
                  {(totaldays == 0) ? (
                    <DisabledButton >Selecione as Datas</DisabledButton>
                  ) : (totaldays >= 15) ? (
                    <DisabledButton >Selecione novas Datas</DisabledButton>
                  ) : (userData.able == false) ? (
                    <DisabledButton >Usuário Não Habilitado</DisabledButton>
                  ) : (
                    <Button onClick={() => sendData(room)}>Reservar Agora</Button>
                  )}
                </CFooter>
              ) : (<></>)
              }
            </Card>
          ))}
        </Cards>

        <div style={{ alignSelf: 'flex-start', marginTop: 24}} >
          <Title style={{ fontSize: 20 }} >Suítes Individuais - Privativas</Title>
          <Subtitle style={{ fontSize: 16 }}>As suítes individuais não são compartilhadas com outros hóspedes.</Subtitle>
        </div>
        <Cards>
          {availableRooms.sort(byName).filter((item: any) => item.title.slice(6, 16) == 'Individual').map((room: any) => (
            <Card key={room.id} >
              <ImgWrap><Image src={room.imageurl} alt={room.title} fill /></ImgWrap>
              <Text>
                {(!loading) ? (
                  <Details>
                    {(userData.relation === 'member') ? (
                      <DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price)}</DText>
                    ) : (<DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice)}</DText>)}
                    <DText>{room.capacity}<FiUsers size={14} color={'#EB5757'} /></DText>
                  </Details>
                ) : (<></>)}
                <CTitle>{room.title}</CTitle>
                <CResume>{room.resume}</CResume>
              </Text>
              {(!loading) ? (
                <CFooter>
                  {(userData.relation === 'member') ? (
                    <FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price * totaldays)}</FText>
                  ) : (<FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice * totaldays)}</FText>)}
                  {(totaldays == 0) ? (
                    <DisabledButton >Selecione as Datas</DisabledButton>
                  ) : (totaldays >= 15) ? (
                    <DisabledButton >Selecione novas Datas</DisabledButton>
                  ) : (userData.able == false) ? (
                    <DisabledButton >Usuário Não Habilitado</DisabledButton>
                  ) : (
                    <Button onClick={() => sendData(room)}>Reservar Agora</Button>
                  )}
                </CFooter>
              ) : (<></>)
              }
            </Card>
          ))}
        </Cards>


        <div style={{ alignSelf: 'flex-start', marginTop: 24}} >
          <Title style={{ fontSize: 20 }}>Apartamentos Coletivos Femininos</Title>
          <Subtitle style={{ fontSize: 16 }}>Os quartos a seguir são compartilhados e outras pessoas podem se hospedar no mesmo apartamento. <br />As reservas devem ser feitas para um hóspede por vez.</Subtitle>
        </div>
        <Cards>
          {availableRooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva' && item.title.slice(20,28) == "Feminino").map((room: any) => (
            <Card key={room.id} >
              <ImgWrap><Image src={room.imageurl} alt={room.title} fill /></ImgWrap>
              <Text>
                {(!loading) ? (
                  <Details>
                    {(userData.relation === 'member') ? (
                      <DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price)}</DText>
                    ) : (<DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice)}</DText>)}
                    <DText>{room.capacity}<FiUsers size={14} color={'#EB5757'} /></DText>
                  </Details>
                ) : (<></>)}
                <CTitle>{room.title}</CTitle>
                <CResume>{room.resume}</CResume>
              </Text>
              {(!loading) ? (
                <CFooter>
                  {(userData.relation === 'member') ? (
                    <FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price * totaldays)}</FText>
                  ) : (<FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice * totaldays)}</FText>)}
                  {(totaldays == 0) ? (
                    <DisabledButton >Selecione as Datas</DisabledButton>
                  ) : (totaldays >= 15) ? (
                    <DisabledButton >Selecione novas Datas</DisabledButton>
                  ) : (userData.able == false) ? (
                    <DisabledButton >Usuário Não Habilitado</DisabledButton>
                  ) : (
                    <Button onClick={() => sendData(room)}>Reservar Agora</Button>
                  )}
                </CFooter>
              ) : (<></>)
              }
            </Card>
          ))}
        </Cards>

        <div style={{ alignSelf: 'flex-start', marginTop: 24}} >
          <Title style={{ fontSize: 20 }}>Apartamentos Coletivos Masculinos</Title>
          <Subtitle style={{ fontSize: 16 }}>Os quartos a seguir são compartilhados e outras pessoas podem se hospedar no mesmo apartamento. <br />As reservas devem ser feitas para um hóspede por vez.</Subtitle>
        </div>
        <Cards>
          {availableRooms.sort(byName).filter((item: any) => item.title.slice(6, 14) == 'Coletiva' && (item.title.slice(20,29) == "Masculino" || item.title.slice(15,17) == "12" || item.title.slice(15,17) == "13")).map((room: any) => (
            <Card key={room.id} >
              <ImgWrap><Image src={room.imageurl} alt={room.title} fill /></ImgWrap>
              <Text>
                {(!loading) ? (
                  <Details>
                    {(userData.relation === 'member') ? (
                      <DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price)}</DText>
                    ) : (<DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice)}</DText>)}
                    <DText>{room.capacity}<FiUsers size={14} color={'#EB5757'} /></DText>
                  </Details>
                ) : (<></>)}
                <CTitle>{room.title}</CTitle>
                <CResume>{room.resume}</CResume>
              </Text>
              {(!loading) ? (
                <CFooter>
                  {(userData.relation === 'member') ? (
                    <FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price * totaldays)}</FText>
                  ) : (<FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.guestprice * totaldays)}</FText>)}
                  {(totaldays == 0) ? (
                    <DisabledButton >Selecione as Datas</DisabledButton>
                  ) : (totaldays >= 15) ? (
                    <DisabledButton >Selecione novas Datas</DisabledButton>
                  ) : (userData.able == false) ? (
                    <DisabledButton >Usuário Não Habilitado</DisabledButton>
                  ) : (
                    <Button onClick={() => sendData(room)}>Reservar Agora</Button>
                  )}
                </CFooter>
              ) : (<></>)
              }
            </Card>
          ))}
        </Cards>
      </Wrapper>
    </Container>
  );
}

export default List;
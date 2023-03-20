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
    return current && current < moment().endOf("day")
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

  return (
    <Container>
      <Wrapper>
        <Heading>
          <Title>Apartamentos ADUFPI</Title>
          <Subtitle>Selecione as datas da hospedagem</Subtitle>
          <RangePicker format="DD-MM-YYYY" inputReadOnly={true} onChange={filterByDate} locale={locale} allowClear={false} disabledDate={disabledDate} />
        </Heading>
        <Cards>
          {availableRooms.map((room: any) => (
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
                    <DisabledButton>Selecione as Datas</DisabledButton>
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
import Image from "next/image";
import { Button, Card, Cards, CFooter, Container, CResume, CTitle, Details, DisabledButton, DText, FText, Heading, ImgWrap, Subtitle, Text, Title, Wrapper } from "./ListStyles";
import { FiUsers } from 'react-icons/fi'
import { useRouter } from "next/router";

import { DatePicker } from 'antd'
const { RangePicker } = DatePicker;
import locale from 'antd/lib/date-picker/locale/pt_BR';
import moment from 'moment';


const List = ({availableRooms, totaldays, filterByDate, fromdate, todate}:any) => {
  const router = useRouter()
  const disabledDate = (current:any) => {
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
              <Details>
                <DText>Diária: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price)}</DText>
                <DText>{room.capacity}<FiUsers size={14} color={'#EB5757'} /></DText>
              </Details>
              <CTitle>{room.title}</CTitle>
              <CResume>{room.resume}</CResume>
            </Text>
            <CFooter>
              <FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price * totaldays)}</FText>
              {(totaldays == 0) ? (
                <DisabledButton>Selecione as Datas</DisabledButton>
              ) : (
                <Button onClick={() => sendData(room)}>Reservar Agora</Button>
              )}
            </CFooter>
          </Card>
          ))}
        </Cards>
      </Wrapper>
    </Container>
   );
}
 
export default List;
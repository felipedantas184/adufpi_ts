import Image from "next/image";
import { Button, Card, Cards, CFooter, Container, CResume, CTitle, Details, DText, FText, Heading, ImgWrap, Subtitle, Text, Title, Wrapper } from "./ListStyles";
import { FiUsers } from 'react-icons/fi'
import { useRouter } from "next/router";

const List = ({availableRooms}: any) => {
  const router = useRouter()

  function sendData(room: any) {
    router.push({
      pathname: `/checkout/${room.id}`,
      query: {
        from: '02-01-2001',
        to: '14-01-2001',
        totaldays: 12
      }
    }, /**`/checkout/${room.id}`*/)
  }

  return ( 
    <Container>
      <Wrapper>
        <Heading>
          <Title>Apartamentos ADUFPI</Title>
          <Subtitle>Selecione as datas da hospedagem</Subtitle>
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
              <FText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(room.price)}</FText>
              <Button onClick={() => sendData(room)}>Reservar Agora</Button>
            </CFooter>
          </Card>
          ))}
        </Cards>
      </Wrapper>
    </Container>
   );
}
 
export default List;
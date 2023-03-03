import { FaUserCircle } from "react-icons/fa";
import { Box, Container, Heading, Info, Label, Name, Personal, Resume, Subtitle, Title, Wrapper } from "./ProfileStyles";

const Profile = () => {
  return ( 
    <Container>
      <Wrapper>
        <Heading>
          <Title>Meu Perfil</Title>
          <Subtitle>Aqui estão as suas infotmações</Subtitle>
        </Heading>
        <Personal>
          <FaUserCircle color="#44444A" size={32} />
          <Name>Felipe Augusto Oliveira Dantas</Name>
        </Personal>
        <Info>
          <Box>
            <Label>Nome</Label>
            <Resume>Felipe Augusto Oliveira Dantas</Resume>
          </Box>
          <Box>
            <Label>E-mail</Label>
            <Resume>felipedantas184@gmail.com</Resume>
          </Box>
          <Box>
            <Label>Telefone</Label>
            <Resume>(86) 99518-5757</Resume>
          </Box>
          <Box>
            <Label>CPF</Label>
            <Resume>056.202.043-83</Resume>
          </Box>
          <Box>
            <Label>Relação</Label>
            <Resume>Associado</Resume>
          </Box>
          <Box>
            <Label>CEP</Label>
            <Resume>64091-250</Resume>
          </Box>
          <Box>
            <Label>Endereço</Label>
            <Resume>Av. Prof. Zaíra Freire</Resume>
          </Box>
          <Box>
            <Label>Bairro</Label>
            <Resume>Gurupi</Resume>
          </Box>
        </Info>
      </Wrapper>
    </Container>
   );
}
 
export default Profile;
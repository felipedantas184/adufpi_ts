import { Box, Container, Item, Title, Wrapper } from "./WarningStyles";

const Warning = () => {
  return ( 
    <Container>
      <Wrapper>
        <Box>
          <Title>Regras e Avisos</Title>
          <Item>Os apartamentos são dedicados ao sócio, podendo incluir cônjuge e/ou filhos.</Item>
          <Item>Os quartos coletivos devem ser reservados de maneira individual e outros hóspedes podem ficar no mesmo quarto (compartilhado).</ Item>
          <Item>Os quartos coletivos também são organizados em Masculino e Feminino. Fique atento durante a reserva.</ Item>
        </Box>
      </Wrapper>
    </Container>
   );
}
 
export default Warning;
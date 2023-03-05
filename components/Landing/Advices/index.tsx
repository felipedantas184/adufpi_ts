import { Container, Heading, Rule, RulesMenu, Title, Wrapper } from "./AdvicesStyles";

const Advices = () => {
  return ( 
    <Container>
      <Wrapper>
        <Heading>
          <Title>Regras e Avisos</Title>
        </Heading>
        <RulesMenu>
          <Rule>Não servimos café da manhã;</Rule>
          <Rule>Não aceitamos pets;</ Rule>
          <Rule>Não nos responsabilizamos pela segurança dos veículos e objetos deixados no seu interior;</ Rule>
          <Rule>Estacionamento gratuito;</ Rule>
          <Rule>WIFI gratuito;</ Rule>
          <Rule>Horário do Checkin 14h00 e Checkout 12h00;</ Rule>
          <Rule>Favor trazer este email com a confirmação de reserva para apresentar à Portaria, principalmente se o checkin for fora do horário comercial;</ Rule>
          <Rule>Cancelamentos só serão aceitos com um dia de antecedência;</ Rule>
          <Rule>Permanência máxima de 15 dias;</ Rule>
          <Rule>Hospedagem permitida exclusivamente de associados, parentes em 1º grau e professores de outras IES;</ Rule>
          <Rule>Havendo mudança de apartamento coletivo para individual os valores serão recalculados;</ Rule>
        </RulesMenu>
      </Wrapper>
    </Container>
   );
}
 
export default Advices;
import { Close, Container, Item, Logo, Menu, Wrapper } from "./SidebarStyles";

const Sidebar = () => {
  return ( 
    <Container>
      <Wrapper>
        <Close></Close>
        <Logo></Logo>
        <Menu>
          <Item>Principal</Item>
          <Item>Principal</Item>
          <Item>Principal</Item>
        </Menu>
      </Wrapper>
    </Container>
   );
}
 
export default Sidebar ;
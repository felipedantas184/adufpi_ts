import { FaEdit } from "react-icons/fa";
import { MdOutlineCancel } from 'react-icons/md'
import { Container, HeaderItem, HeaderItemSmall, Heading, Subtitle, Table, TableHeader, TableItem, TableItemSmall, TableRow, TableWrapper, Title, Wrapper } from "./AdminStyles";

const Admin = () => {
  return (
    <Container>
      <Wrapper>
        <Heading>
          <Title></Title>
          <Subtitle></Subtitle>
        </Heading>
        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderItem>Nome</HeaderItem>
              <HeaderItem>Quarto</HeaderItem>
              <HeaderItem>Check-In</HeaderItem>
              <HeaderItem>Check-Out</HeaderItem>
              <HeaderItem>Valor Total</HeaderItem>
              <HeaderItem>Pagamento</HeaderItem>
              <HeaderItem>Status</HeaderItem>
              <HeaderItemSmall>Ação</HeaderItemSmall>
            </TableHeader>
            <TableRow >
              <TableItem></TableItem>
              <TableItem></TableItem>
              <TableItem></TableItem>
              <TableItem></TableItem>
              <TableItem></TableItem>
              <TableItem></TableItem>
              <TableItem></TableItem>
              <TableItemSmall style={{ gap: 8 }}>
                <MdOutlineCancel style={{ cursor: 'pointer' }} size={16} color={'#EC5757'} />
                <FaEdit style={{ cursor: 'pointer' }} size={16} color={'#C4C4C4'} />
              </TableItemSmall>
            </TableRow>
          </Table>
        </TableWrapper>
      </Wrapper>
    </Container>
  );
}

export default Admin;
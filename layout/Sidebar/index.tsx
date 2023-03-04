import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
import { BWrap, Close, Container, Item, Logo, Menu, SButton, Wrapper } from "./SidebarStyles";

const Sidebar = ({ isOpen, toggle }:any) => {
  const { logout } = useAuth()
	const router = useRouter()

  
  return (
    <Container isOpen={isOpen}>
      <Wrapper>
        <Close onClick={toggle}>
          <FaTimes color="#13131A" />
        </Close>
        <Logo href={'/'} ><Image src={'/images/black_logo.png'} alt='ADUFPI Logo' fill /></Logo>
        <Menu>
          <Item><Link href={'/'}>Quartos</Link></Item>
          <Item><Link href={'/bookings'}>Minhas Reserva</Link>s</Item>
          <Item><Link href={'/profile'}>Meu Perfil</Link></Item>
        </Menu>
        <SButton onClick={() => {
						logout()
						router.push('/login')
					}} >Logout</SButton>
      </Wrapper>
    </Container>
  );
}

export default Sidebar;
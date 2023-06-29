import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
import { BWrap, Close, Container, Item, Logo, Menu, SButton, Wrapper } from "./SidebarStyles";
import { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";

const Sidebar = ({ isOpen, toggle }:any) => {
  const { logout, user } = useAuth()
	const router = useRouter()
  const [userData, setUserData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getUser() {
      if (user !== null) {
        const data = await getDoc(doc(fireDB, "users", user?.uid));
        const userData = data.data()

        setUserData(userData)
        setLoading(false)
      }
    }

    getUser()
  }, [user])

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
          {(!loading) ? (
            (userData?.admin) ? (
              <Item><Link href={'/admin'}>Administração</Link></Item>
            ) : (<></>)
          ) : (<></>)}
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
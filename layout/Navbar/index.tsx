import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { Container, Item, IWrap, Logo, Logout, Menu, Mobile, Wrapper } from "./NavbarStyles";
import { FaBars, FaBook, FaHome, FaLock, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import fireDB from "@/firebase/initFirebase";

const Navbar = ({ toggle }: any) => {
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
    <Container>
      <Wrapper>
        <Logo href={'/'} ><Image src={'/images/black_logo.png'} alt='ADUFPI Logo' fill /></Logo>
        <Menu>
          <IWrap><Item href={'/'} ><FaHome color="#44444A" /><>Principal</></Item></IWrap>
          <IWrap><Item href={'/bookings'} ><FaBook color="#44444A" /><>Minhas Reservas</></Item></IWrap>
          <IWrap><Item href={'/profile'} ><FaUser color="#44444A" /><>Meu Perfil</></Item></IWrap>
          {(!loading) ? (
            (userData?.admin) ? (
              <IWrap><Item href={'/admin'} ><FaLock color="#44444A" /><>Administração</></Item></IWrap>
            ) : (<></>)
          ) : (<></>)}
          <IWrap onClick={() => {
            logout()
            router.push('/login')
          }}><Logout><FaSignOutAlt color="#44444A" /><>Logout</></Logout></IWrap>
        </Menu>
        <Mobile onClick={toggle}>
          <FaBars color="#EB5757" />
        </Mobile>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
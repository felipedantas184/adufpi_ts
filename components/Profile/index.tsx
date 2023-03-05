import { useAuth } from "@/context/AuthContext";
import fireDB from "@/firebase/initFirebase";
import { doc, getDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import { Box, Container, Heading, Info, Label, Name, Personal, Resume, Subtitle, Title, Wrapper } from "./ProfileStyles";
import { useEffect, useState } from 'react'

const Profile = () => {
  const { user } = useAuth()
  const [userData, setUserData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getBookings() {
      if (user !== null) {
        const data = await getDoc(doc(fireDB, "users", user?.uid));
        const userData = data.data()
      
        setUserData(userData)
        setLoading(false)
      }
    }

    getBookings()
  }, [user])


  return ( 
    <Container>
      <Wrapper>
        <Heading>
          <Title>Meu Perfil</Title>
          <Subtitle>Aqui estão as suas infotmações</Subtitle>
        </Heading>
        {(!loading) ? (
        <Personal>
          <FaUserCircle color="#44444A" size={32} />
          <Name>{userData?.name} {userData?.surname}</Name>
        </Personal>
        ) : (
          <h1>Carregando</h1>
        )}
        {(!loading) ? (
        <Info>
          <Box>
            <Label>Nome</Label>
            <Resume>{userData?.name}</Resume>
          </Box>
          <Box>
            <Label>E-mail</Label>
            <Resume>{userData?.email}</Resume>
          </Box>
          <Box>
            <Label>Telefone</Label>
            <Resume>({userData?.phone.slice(0,2)}) {userData?.phone.slice(2,7)}-{userData?.phone.slice(7,11)}</Resume>
          </Box>
          <Box>
            <Label>CPF</Label>
            <Resume>{userData?.cpf.slice(0,3)}.{userData?.cpf.slice(3,6)}.{userData?.cpf.slice(6,9)}-{userData?.cpf.slice(9,11)}</Resume>
          </Box>
          <Box>
            <Label>Relação</Label>
            <Resume>{(userData?.relation === 'member') ? 'Associado' : 'Convidado'}</Resume>
          </Box>
          <Box>
            <Label>CEP</Label>
            <Resume>{userData?.cep.slice(0,5)}-{userData?.cep.slice(5,8)}</Resume>
          </Box>
          <Box>
            <Label>Endereço</Label>
            <Resume>{userData?.address}</Resume>
          </Box>
        </Info>
        ): (
          <h1></h1>
        )}
      </Wrapper>
    </Container>
   );
}
 
export default Profile;
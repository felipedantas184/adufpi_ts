import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/router";
import { BWrap, Container, FButton, FOption, Form, Heading, Input, IWrap, Label, LBox, RBox, RSubtitle, RTitle, Title, Wrapper } from "./ResetStyles";

const Reset = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      await login(data.email, data.password)
      router.push('/')
    } catch (err) {
      setLoading(false)
      console.log(err)
      alert('Email ou senha incorretos!')
    }
  }


  return (
    <Container>
      <Wrapper>
        <LBox>
          <Heading>
            <Image src={'/images/black_logo.png'} width={200} height={66} alt='ADUFPI' />
            <Title>Recuperar Senha</Title>
          </Heading>
          <Form onSubmit={handleLogin}>
            <IWrap>
              <Label>E-mail</Label>
              <Input type={'email'} placeholder="Digite seu e-mail" required
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                value={data.email}
              />
            </IWrap>
            <FButton type="submit" >Entrar</FButton>
          </Form>
          <BWrap>
            <FOption>Entre</FOption>
            <FOption>Cadastre-se</FOption>
          </BWrap>
        </LBox>
        <RBox>
          <RTitle>Recupere Sua Senha</RTitle>
          <RSubtitle>Você receberá um e-mail de recuperação de senha.</RSubtitle>
        </RBox>
      </Wrapper>
    </Container>
  );
}

export default Reset;
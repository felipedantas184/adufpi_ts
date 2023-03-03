import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/router";
import { BWrap, Container, FButton, FOption, Form, Heading, Input, IWrap, Label, LBox, RBox, RSubtitle, RTitle, Title, Wrapper } from "./LoginStyles";

const Login = () => {
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
            <Title>Login</Title>
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
            <IWrap>
              <Label>Senha</Label>
              <Input type={'password'} placeholder="Digite sua senha" required
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                value={data.password}
              />
            </IWrap>
            <FButton type="submit" >Entrar</FButton>
          </Form>
          <BWrap>
            <FOption>Esqueci minha senha</FOption>
            <FOption>Cadastre-se</FOption>
          </BWrap>
        </LBox>
        <RBox>
          <RTitle>Bem-Vindo de Volta!</RTitle>
          <RSubtitle>Falta pouco para conhecer os quartos disponíveis para sua reserva!</RSubtitle>
        </RBox>
      </Wrapper>
    </Container>
  );
}

export default Login;
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/router";
import { BWrap, Container, FButton, FOption, Form, Heading, Input, IWrap, Label, LBox, RBox, RSubtitle, RTitle, Title, Wrapper } from "./ResetStyles";

const Reset = () => {
  const router = useRouter()
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleResetPassword = async (e:any) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      await forgotPassword(email)
      alert('E-mail de redefinição de senha enviado! Clique no link presente no email e redefina sua senha!')
      router.push('/')
    } catch (err) {
      setLoading(false)
      console.log(err)
      alert('Não foi possível realizar essa tarefa!')
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
          <Form onSubmit={handleResetPassword}>
            <IWrap>
              <Label>E-mail</Label>
              <Input type={'email'} placeholder="Digite seu e-mail" required
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                value={email}
              />
            </IWrap>
            <FButton type="submit" >Recuperar Senha</FButton>
          </Form>
          <BWrap>
            <FOption href={'/login'} >Entrar</FOption>
            <FOption href={'/signup'}>Cadastre-se</FOption>
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
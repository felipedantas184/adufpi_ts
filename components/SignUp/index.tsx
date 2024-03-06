import { useAuth } from "@/context/AuthContext";
import fireDB, { auth } from "@/firebase/initFirebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react"
import { BWrap, Container, FButton, FOption, Form, Heading, Input, InputSplit, InputSplitGroup, IWrap, Label, Title, Wrapper } from "./SignUpStyles";

const SingUp = () => {
  const router = useRouter()
  const { user, signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    phone: '',
    cpf: '',
    address: '',
    cep: '',
    relation: '',
  })

  const handleSignup = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      await signup(data.email, data.password).then(auth => {
        return setDoc(doc(fireDB, "users", auth.user.uid), {
          name: data.name,
          surname: data.surname,
          phone: data.phone,
          cpf: data.cpf,
          email: data.email,
          address: data.address,
          cep: data.cep,
          relation: data.relation,
          admin: false,
          able: false,
        })
      })
      if (auth.currentUser !== null) {
        updateProfile(auth.currentUser, {
          displayName: data.name + ' ' + data.surname,
        })
      }
      router.push('/login')
    } catch (err) {
      setLoading(false)
      alert(err)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Heading>
          <Image src={'/images/black_logo.png'} width={200} height={66} alt='ADUFPI' />
          <Title>Cadastro</Title>
        </Heading>
        <form onSubmit={handleSignup} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}} >
        <Form>
          <IWrap>
            <Label>Primeiro Nome</Label>
            <Input type={'text'} placeholder="João Batista" required
              onChange={(e) =>
                setData({
                  ...data,
                  name: e.target.value,
                })
              }
              value={data.name}
            />          </IWrap>
          <IWrap>
            <Label>Sobrenome</Label>
            <Input type={'text'} placeholder="da Silva Barros" required
              onChange={(e) =>
                setData({
                  ...data,
                  surname: e.target.value,
                })
              }
              value={data.surname}
            />          </IWrap>
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
          <IWrap>
            <Label>Telefone</Label>
            <Input type={'number'} placeholder="86998885566" required
              onChange={(e) =>
                setData({
                  ...data,
                  phone: e.target.value,
                })
              }
              value={data.phone}
            />
          </IWrap>
          <IWrap>
            <Label>CPF</Label>
            <Input type={'number'} placeholder="12345678901" required
              onChange={(e) =>
                setData({
                  ...data,
                  cpf: e.target.value,
                })
              }
              value={data.cpf}
            />
          </IWrap>
          <IWrap>
            <Label>Endereço</Label>
            <Input type={'text'} placeholder="Av. Joca Pires, 1231" required
              onChange={(e) =>
                setData({
                  ...data,
                  address: e.target.value,
                })
              }
              value={data.address}
            />
          </IWrap>
          <IWrap>
            <Label>CEP</Label>
            <Input type={'number'} placeholder="64001220" required
              onChange={(e) =>
                setData({
                  ...data,
                  cep: e.target.value,
                })
              }
              value={data.cep}
            />
          </IWrap>
        </Form>
        <InputSplit style={{ justifyContent: 'space-between', width: '100%' }}>
          <InputSplitGroup>
            <div>
              <input type="radio" id="member" name="relation" value="member" required
                onClick={(e: any) =>
                  setData({
                    ...data,
                    relation: e.target.value,
                  })
                } />
              <Label htmlFor="member">Associado</Label>
            </div>
          </InputSplitGroup>
          <InputSplitGroup>
            <div>
              <input type="radio" id="guest" name="relation" value="guest"
                onClick={(e: any) =>
                  setData({
                    ...data,
                    relation: e.target.value,
                  })
                } />
              <Label htmlFor="guest">Convidado</Label>
            </div>
          </InputSplitGroup>
        </InputSplit>
        <BWrap>
          <FButton type="submit" >Cadastrar</FButton>
          <FOption href={'/login'}>Já possuo conta</FOption>
        </BWrap>
        </form>
      </Wrapper>
    </Container>
  );
}

export default SingUp;
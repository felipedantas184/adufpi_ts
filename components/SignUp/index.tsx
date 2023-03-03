import Image from "next/image";
import { useState } from "react"
import { BWrap, Container, FButton, FOption, Form, Heading, Input, IWrap, Label, Title, Wrapper } from "./SignUpStyles";

const SingUp = () => {
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

  return (
    <Container>
      <Wrapper>
        <Heading>
          <Image src={'/images/black_logo.png'} width={200} height={66} alt='ADUFPI' />
          <Title>Cadastro</Title>
        </Heading>
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
            <Input type={'number'} placeholder="86995185757" required
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
            <Input type={'number'} placeholder="05620204383" required
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
        <BWrap>
          <FButton type="submit" >Cadastrar</FButton>
          <FOption>Entre</FOption>
        </BWrap>
      </Wrapper>
    </Container>
  );
}

export default SingUp;
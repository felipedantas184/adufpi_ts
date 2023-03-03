import Image from "next/image";
import { Container, ELink, Logo, Rights, SIcon, Social, Wrapper } from "./FooterStyles";
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return ( 
    <Container>
      <Wrapper>
        <Logo href={'/'} ><Image src={'/images/white_logo.png'} alt='ADUFPI Logo' fill /></Logo>
        <Rights>ADUFPI © {new Date().getFullYear()} Criado por Tecdata.</Rights>
        <Social>
          <SIcon><ELink rel="noreferrer" href='https://pt-br.facebook.com/adufpi/' target='_blank' arial-label='Facebook' ><FaFacebook /></ELink></SIcon>
          <SIcon><ELink rel="noreferrer" href='https://www.instagram.com/adufpi/' target='_blank' arial-label='Instagram' ><FaInstagram/></ELink></SIcon>
          <SIcon><ELink rel="noreferrer" href='mailto:secretaria@adufpi.org.br' target='_blank' arial-label='Email' ><FaEnvelope /></ELink></SIcon>
          <SIcon><ELink rel="noreferrer" href='https://twitter.com/adufpi' target='_blank' arial-label='Twitter' ><FaTwitter /></ELink></SIcon>
          <SIcon><ELink rel="noreferrer" href='https://www.youtube.com/channel/UCJDrKt4jf1SZ10x_kkyqU8A' target='_blank' arial-label='Youtube' ><FaYoutube /></ELink></SIcon>
        </Social>
      </Wrapper>
    </Container>
   );
}
 
export default Footer;
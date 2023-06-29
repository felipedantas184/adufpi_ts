import Profile from "@/components/Profile";
import Layout from "@/layout/Layout";
import Head from "next/head";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Meu Perfil | ADUFPI Apartamentos</title>
        <meta name="description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Meu Perfil | ADUFPI Apartamentos" />
        <meta property="og:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:site_name" content="Meu Perfil | ADUFPI Apartamentos" />

        <meta property="twitter:title" content="Meu Perfil | ADUFPI Apartamentos" />
        <meta property="twitter:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="twitter:image" content="/apple-touch-icon.png" />
      </Head>
      <Layout>
        <Profile />
      </Layout>
    </>
  );
}

export default ProfilePage;
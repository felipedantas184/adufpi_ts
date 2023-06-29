import Reset from "@/components/Reset";
import Head from "next/head";

const ResetPage = () => {
  return ( 
    <>
      <Head>
        <title>Recuperar Senha ADUFPI | Apartamentos</title>
        <meta name="description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="Recuperar Senha ADUFPI | Apartamentos" />
        <meta property="og:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:site_name" content="Recuperar Senha ADUFPI | Apartamentos" />

        <meta property="twitter:title" content="Recuperar Senha ADUFPI | Apartamentos" />
        <meta property="twitter:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="twitter:image" content="/apple-touch-icon.png" />
      </Head>
      <Reset />
    </>
   );
}
 
export default ResetPage;
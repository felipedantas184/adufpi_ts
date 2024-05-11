import Head from 'next/head'

export default function ContratoPage() {
  return (
    <>
      <Head>
        <title>ADUFPI | Apartamentos</title>
        <meta name="description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta property="og:title" content="ADUFPI | Apartamentos" />
        <meta property="og:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:site_name" content="ADUFPI | Apartamentos" />

        <meta property="twitter:title" content="ADUFPI | Apartamentos" />
        <meta property="twitter:description" content="Reserva de apartamentos ADUFPI. Realize sua reserva em nosso site e aproveite de todas as comodidades." />
        <meta property="twitter:image" content="/apple-touch-icon.png" />
      </Head>
      <main style={{ padding: 32, marginLeft: 'auto', marginRight: 'auto'}} >
        <h1 style={{textAlign: 'center'}}>CONTRATO DE ESTADIA NA CASA DOCENTE DA ADUFPI</h1>
        <p style={{textAlign: 'center'}}>Este contrato estabelece os termos e condições para a estadia na Casa Docente da ADUFPI, localizada na Sede Social da ADUFPI, na Av. Universitária, 391 – Ininga, Teresina, Piauí</p>

        <ol type='I' style={{display: 'flex', flexDirection: 'column', gap: 4, marginTop: 32}}>
          <li style={{fontWeight: 600}} >Partes Envolvidas: </li>
          <ol type='1' style={{marginBottom: 16}} >
            <li>A Associação dos Docentes da Universidade Federal do Piauí (ADUFPI), doravante denominada “ADUFPI”.</li>
            <li>O(a) hospede, doravante denominado(a) “Hospede”.</li>
          </ol>
          <li style={{fontWeight: 600}} >Descrição das Acomodações: </li>
          <ol type='1' style={{marginBottom: 16}} >
            <li>A Casa Docente oferece quartos coletivos, suítes individuais, suíte para casais e suíte para famílias.</li> <li>Os quartos coletivos são compartilhados e têm capacidade para até quatro pessoas, com quatro camas cada. Se optar por esses quartos, esteja ciente de que mais docentes podem compartilhar o mesmo quarto, caso haja vagas disponíveis. Os quartos coletivos são separados por gênero. A escolha do quarto deve refletir a identidade de gênero com a qual o(a) hóspede se identifica.</li> <li> As suítes individuais, casais e familiares são privativas, não sendo compartilhadas com outros hóspedes.</li> <li> Todas as acomodações estão equipadas com televisão, frigobar, internet e ar condicionado. </li>
          </ol>
          <li style={{fontWeight: 600}} >Reserva:</li>
          <ol type='1' style={{marginBottom: 16}} >
            <li> As reservas devem ser feitas pelo site da ADUFPI, na aba “SERVIÇOS `{'>'}` CASA DOCENTE”, ou diretamente pelo link fornecido.</li>
            <li> A reserva deve ser efetuada exclusivamente pelo sócio titular da ADUFPI. </li>
            <li>As reservas para um(a) professor(a) de outra instituição de ensino superior (IES) devem ser feitas pelo sócio titular da ADUFPI. Para efetuar a reserva, o sócio titular deve enviar um ofício para sedesocial@adufpi.org.br especificando o período da estadia e informando qual atividade o(a) professor(a) convidado(a) realizará na Universidade Federal do Piauí. A
              aprovação da reserva está condicionada ao envio do ofício pelo sócio titular. O valor cobrado pela estadia de um(a) professor(a) de outra IES será o aplicado a não sócios.</li>
            <li> O sócio titular também pode reservar acomodações para parentes de primeiro grau, como pais, filhos ou cônjuges, sendo que o valor cobrado para esses parentes será o mesmo aplicado aos sócios.
            </li>
            <li> Para quartos coletivos, as reservas são feitas individualmente e outros hóspedes podem ser acomodados no mesmo quarto. Se um hóspede desejar ter o quarto coletivo exclusivamente para si, será necessário pagar pelas camas que ficarem disponíveis</li>
          </ol>
          <li style={{fontWeight: 600}} >Regras Gerais de Estadia:</li>
          <ol type='1' style={{marginBottom: 16}} >
            <li>Não são fornecidas refeições, incluindo café da manhã.</li>
            <li>Não são permitidos animais de estimação.</li>
            <li>A ADUFPI não se responsabiliza pela segurança de veículos e objetos deixados no interior da Casa Docente.</li>
            <li>Estacionamento e Wi-Fi são gratuitos.</li>
            <li>O horário de check-in é às 14h e o checkout às 12h.</li>
            <li>Cancelamentos devem ser feitos com pelo menos um dia de antecedência. </li>
            <li>O período máximo de permanência permitido na Casa Docente é de 15 dias consecutivos. Após o término da estadia, é necessário aguardar um intervalo mínimo de 15 dias antes de efetuar uma nova reserva.</li>
            <li>Em caso de mudança de apartamento coletivo para individual, os valores serão recalculados.</li>
            <li>Na entrada, é entregue uma toalha para cada hóspede, que não será trocada durante a estadia e deve ser devolvida no momento do checkout.</li>
          </ol>
          <li style={{fontWeight: 600}} >Manutenção e Preservação do Local:</li>
          <ol type='1' style={{marginBottom: 16}} >
            <li>Não é permitido realocar móveis dentro da Casa Docente sem autorização prévia da administração.</li>
            <li>Não é permitido pregar, colar ou pendurar objetos nas paredes, portas ou móveis que causem danos ou deixem marcas permanentes.</li>
            <li>Qualquer dano causado pelos hospedes à propriedade, móveis ou equipamentos da Casa Docente deve ser relatado imediatamente à administração. Os custos de reparo ou substituição serão de responsabilidade do hóspede.</li>
            <li>O silêncio deve ser mantido entre as 22h e as 7h para respeitar outros hóspedes. Comportamentos inadequados ou perturbadores podem resultar em sanções, incluindo a expulsão.</li>
            <li>O uso dos aparelhos eletrônicos, como televisão, frigobar e ar-condicionado, deve ser feito de acordo com as instruções fornecidas pela administração. Qualquer dano causado por uso inadequado será de responsabilidade do hóspede.</li>
            <li>Não é permitido permitir a entrada de pessoas não registradas na Casa Docente. Apenas os hóspedes registrados e o pessoal autorizado pela administração podem acessar as instalações.</li>
            <li>O uso de substâncias ilegais, armas, explosivos ou qualquer item que possa comprometer a segurança dos hóspedes é estritamente proibido. Qualquer violação será imediatamente relatada às autoridades competentes. </li>          </ol>
          <li style={{fontWeight: 600}} >Cláusulas Gerais:</li>
          <ol type='1' style={{marginBottom: 16}} >
            <li>Responsabilidade do Hóspede: O hóspede é responsável por seus pertences pessoais. A ADUFPI não se responsabiliza por perdas ou danos a objetos pessoais dentro da Casa Docente.</li>
            <li>Rescisão do Contrato: A administração da Casa Docente reserva-se o direito de rescindir o contrato e solicitar a saída do hóspede em caso de violação grave destas regras ou por comportamento inaceitável.</li>
          </ol>
        </ol>

        <footer>
          <p>Ao realizar a reserva e ao efetuar o check-in na Casa Docente da ADUFPI, o hóspede concorda em cumprir todos os termos e condições estabelecidos neste contrato. Qualquer violação destas regras pode resultar em ações apropriadas, incluindo custos adicionais para reparos, limpeza ou outras sanções administrativas.</p>
        </footer>
      </main>
    </>
  )
}

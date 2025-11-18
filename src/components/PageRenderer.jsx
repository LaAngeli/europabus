import Home from '../views/Home'
import Rute from '../views/Rute'
import Rezervari from '../views/Rezervari'
import Contacte from '../views/Contacte'
import DespreNoi from '../views/DespreNoi'
import FAQ from '../views/FAQ'
import Termeni from '../views/Termeni'
import Politica from '../views/Politica'
import Galerie from '../views/Galerie'

const PAGE_COMPONENTS = {
  home: Home,
  rute: Rute,
  rezervari: Rezervari,
  contacte: Contacte,
  despreNoi: DespreNoi,
  faq: FAQ,
  termeni: Termeni,
  politica: Politica,
  galerie: Galerie
}

const PageRenderer = ({ pageKey }) => {
  const Component = PAGE_COMPONENTS[pageKey] || Home
  return <Component />
}

export default PageRenderer


//next16+

import FilmeForm from "@/componentes/FilmeForm/FilmeForm";
import { getFilmeUnico } from "@/services/filme.services";

interface Props{
params: Promise<{id: string}>;


}
export default async function EditarFilmePage({params}: Props) {

  const {id} = await params;
  const filme = await getFilmeUnico(Number(id));

  return (

    <FilmeForm filme = {filme}/>

  );
}
//next16+

import FilmeForm from "@/componentes/FilmeForm/FilmeForm";
import { getFilmeUnico } from "@/services/filme.services";
import { cookies } from "next/headers";

interface Props{
params: Promise<{id: string}>;


}
export default async function EditarFilmePage({params}: Props) {

  const cookieStore = await cookies();
  const cookieHeaders = cookieStore.toString();

  const {id} = await params;
  const filme = await getFilmeUnico(id, cookieHeaders);

  return (

    <FilmeForm filme = {filme}/>

  );
}
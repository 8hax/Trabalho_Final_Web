import {Filme, CreateFilmeDTO, UpdateFilmeDTO} from "@/tipos/filme";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFilmes(): Promise<Filme[]>
{
  const response  = await fetch(`${API_URL}/filmes`);
  const dados = await response.json();
  return dados;
}

export async function getFilmeUnico(id: number): Promise<Filme>{
  const response = await fetch(`${API_URL}/filmes/${id}`);
  const dados = await response.json();
  return dados;
}


export async function createFilme(filme: CreateFilmeDTO): Promise<void>
{
 await fetch(`${API_URL}/filmes`,{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(filme)
 });
}


export async function updateFilme(id: number, filme: UpdateFilmeDTO): Promise<void>
{
  await fetch(`${API_URL}/filmes/${id}`,{
    method: "PUT",
    headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(filme)
 });
}

export async function deleteFilme(id: number): Promise<void>
{
  await fetch(`${API_URL}/filmes/${id}`,{
    method: "DELETE",
  });
}
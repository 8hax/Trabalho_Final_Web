import styles from '@/app/page.module.css';
import FilmeGrid from '@/componentes/FilmesGrid/FilmesGrid';
import { getFilmes } from '@/services/filme.services';
import { readRouteCacheEntry } from 'next/dist/client/components/segment-cache/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token)
  {
    redirect("/login");
  }

  const cookieHeader = cookieStore.toString();
  const filmes = await getFilmes(cookieHeader);

  return (
    <main className={styles.home}>
      <Link href="/filmes/criar" className={styles.btnAdd}>
        + Adicionar
      </Link>
      <FilmeGrid filmes = {filmes}/>
    </main>
  );
}
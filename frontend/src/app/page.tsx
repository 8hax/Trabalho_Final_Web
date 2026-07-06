import styles from '@/app/page.module.css';
import FilmeGrid from '@/componentes/FilmesGrid/FilmesGrid';
import { getFilmes } from '@/services/filme.services';
import Link from 'next/link';

export default async function Home() {

  const filmes = await getFilmes();

  return (
    <main className={styles.home}>
      <Link href="/filmes/criar" className={styles.btnAdd}>
        + Adicionar
      </Link>
      <FilmeGrid filmes = {filmes}/>
    </main>
  );
}
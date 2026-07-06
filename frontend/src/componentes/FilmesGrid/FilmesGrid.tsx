"use client";

import { deleteFilme } from "@/services/filme.services";
import { Filme } from "@/tipos/filme";
import { useRouter } from "next/navigation";
import FilmeCard from "../FilmeCard/FilmeCard";
import '@/componentes/FilmesGrid/FilmeGrid.css';


interface FilmeGridProps{
    filmes: Filme[];

}

export default function FilmeGrid({filmes}: FilmeGridProps){
    const router = useRouter();

    async function handleDelete(id: number){
        await deleteFilme(id);
        router.refresh();
    }

    const filmesMap = filmes.map((f) => {
        return <FilmeCard key={f.id}
         filme={f} 
         onDelete={handleDelete} />
    });

    return(
        <div className="grid">
            {filmesMap}
        </div>
    );
}
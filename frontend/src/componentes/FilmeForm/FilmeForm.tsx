"use client";

import '@/componentes/FilmeForm/FilmeForm.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Filme} from '@/tipos/filme';
import { createFilme, updateFilme } from '@/services/filme.services';

interface Props{
    filme?: Filme;
}

export default function FilmeForm({filme}: Props){

    const router = useRouter();

    const [titulo,setTitulo] = useState(
        filme?.titulo ?? ""
    );
    const [imagem, setImagem] = useState(
        filme?.imagem ?? ""
    );
    const [nota, setNota] = useState(
        filme?.nota ?? 0
    )

    async function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        const payload = {
            titulo,
            imagem,
            nota
        };

        if(filme){
            //chama o serviço para editar
            await updateFilme(filme.id, payload);
        }
        else{
            //chama o serviço para criar
            await createFilme(payload);
        }
        router.push('/');
    }

    return(
        <form onSubmit={handleSubmit} className='filme-form'>
            <h1>
                {
                    filme? "Editar Filme" : "Novo Filme"
                }
            </h1>
            <div className='form-input'>
                <input 
                type="text"
                placeholder='Titulo do Filme'
                onChange={(e) => setTitulo(e.target.value)}
                value={titulo}
                />
            </div>

            <div className='form-input'>
                <input 
                type="text" 
                placeholder='Url da Imagem'
                onChange={(e) => setImagem(e.target.value)}
                value={imagem}
                />
            </div>

            <div className='form-input'>
                <input 
                type="number"
                placeholder='Nota do Filme' 
                onChange={(e) => setNota(Number(e.target.value))}
                value={nota}
                />
            </div>
            
            <button type='submit'>Salvar</button>


        </form>
    )



}
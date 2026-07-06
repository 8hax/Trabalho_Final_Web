"use client"

import { createSchema } from "@/schemas/create.schema";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import Image from "next/image"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import "@/componentes/CreateForm/CreateForm.css"
import { create } from "@/services/auth.services";

export default function CreateForm()
{
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        const router = useRouter();
        e.preventDefault();
        

        //Validar os campos
        const result = createSchema.safeParse({
            email, 
            senha,
            confSenha
        });

        // Se der ruim
        if (!result.success){
            toast.error(result.error.issues[0].message);
            return;
        }

        //Mandar para o servidor do megabrain
        try {
            await create({email, senha});
            toast.success("Usuário(a) criado(a) com sucesso.");
            router.push("/");
        } catch (error) {
            toast.error("Usuário ou senha inválidos");
        }



    }

    return (
        <form onSubmit={handleSubmit} className="create-form">
            <Image 
                src="/logo-tmdb.svg"
                alt="Logo TMDB"
                width={200}
                height={40}
                className="logo-img"
            />

        <div className="div-input">
            <input type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                aria-label="Email"
            />
        </div>
            <input type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                aria-label="Senha"
            />
        <div className="div-input">
            <input type="password" 
                value={confSenha}
                onChange={(e) => setConfSenha(e.target.value)}
                placeholder="Confirmar Senha"
                aria-label="Confirmar Senha"
            />            
        </div>

        <div className="div-input">
            
        </div>
        <button type="submit"> 
            Criar Conta
        </button>

        </form>

        
    )
}
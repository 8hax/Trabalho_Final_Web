"use client"

import { create } from "domain";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import Image from "next/image"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import "@/componentes/CreateForm/CreateForm.css"
import { loginSchema } from "@/schemas/login.schema";

export default function LoginForm()
{
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        const router = useRouter();
        e.preventDefault();
        

        //Validar os campos
        const result = loginSchema.safeParse({
            email, 
            senha,
        });

        // Se der ruim
        if (!result.success){
            toast.error(result.error.issues[0].message);
            return;
        }

        //Mandar para o servidor do megabrain
        try {
            await login({email, senha});
            toast.success("Login realizado com sucesso");
            router.push("/");
            router.refresh();
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
            
        </div>
        <button type="submit"> 
            Entrar
        </button>

        </form>

        
    )
}
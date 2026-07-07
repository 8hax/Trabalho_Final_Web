import { LoginDTO, LoginResponse } from "@/tipos/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function create(dados: LoginDTO): Promise<void>
{
    const response = await fetch(`${API_URL}/auth/create`, {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(dados),
    });

    if (!response.ok){
        throw new Error ("Erro ao criar usuário(a)");
    }



}

export async function login(dados: LoginDTO) : Promise <LoginResponse>
{
    const response = await fetch (`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dados),
    })

    if (!response.ok){
        throw new Error ("Erro ao fazer login");
    }

    return response.json();
}

export async function logout() : Promise <void>
{
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok){
        throw new Error ("Erro ao fazer logout");
    }

}
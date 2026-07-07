import { LoginDTO, LoginResponse, Me, RegisterDTO } from "@/tipos/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Registro: rota correta é /auth/register e o corpo precisa de username + email + password.
// O backend NÃO loga automaticamente (só cria o usuário), então quem chama redireciona para /login.
export async function register(dados: RegisterDTO): Promise<void> {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        const erro = await response.json().catch(() => null);
        throw new Error(erro?.error ?? "Erro ao criar usuário(a)");
    }
}

// Login: envia { email, password } e recebe { success }. O token vem num cookie httpOnly
// setado pelo backend, por isso credentials:"include" (para o navegador guardar o cookie).
export async function login(dados: LoginDTO): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        const erro = await response.json().catch(() => null);
        throw new Error(erro?.error ?? "Erro ao fazer login");
    }

    return response.json();
}

export async function logout(): Promise<void> {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Erro ao fazer logout");
    }
}

// GET /auth/me: dados do usuário logado (inclui isAdmin). Usado em server components,
// que repassam o cookie httpOnly como header Cookie. cache:"no-store" para refletir o estado atual.
export async function getMe(cookie?: string): Promise<Me> {
    const response = await fetch(`${API_URL}/auth/me`, {
        headers: { Cookie: cookie ?? "" },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Falha ao carregar o usuário");
    }

    return response.json();
}

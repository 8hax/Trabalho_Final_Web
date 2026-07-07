// Corpo enviado no login: o backend (auth.controller loginSchema) espera "password", não "senha".
export interface LoginDTO {
    email: string;
    password: string;
}

// Registro exige username + email + password (auth.controller createSchema).
export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
}

// O login NÃO devolve o token no corpo: ele grava um cookie httpOnly "token"
// e responde apenas { success: true }.
export interface LoginResponse {
    success: boolean;
}

// Resposta de GET /auth/me (auth.service.me): dados do usuário autenticado.
export interface Me {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    isAI: boolean;
    createdAt: string;
}

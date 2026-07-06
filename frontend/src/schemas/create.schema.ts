import {z} from "zod";

export const createSchema = z.object({
    email: z.email("Email inválido"),
    senha: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confSenha: z.string()
}).refine((d) => d.senha === d.confSenha, {
    message: "As senhas não coincidem", 
    path: [
        "confSenha"
    ],
});
"use client";

import { logout } from "@/services/auth.services";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { tryLoadManifestWithRetries } from "next/dist/server/load-components";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { toast } from "sonner";

export default function Logout()
{

    const router = useRouter();
    const handleLogout = async () => {
        try {
            await logout();

            toast.success("Logout realizado com sucesso");
            router.push("/")
            router.refresh();


        } catch (error) {
            toast.error("Erro ao fazer logout");
        }
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}
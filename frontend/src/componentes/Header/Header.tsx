import "@/componentes/Header/Header.css";
import { cookies } from "next/headers";
import Link from "next/link";
import Logout from "../Logout/Logout";

// Server component: lê o cookie httpOnly "token" para decidir o que mostrar (logado vs. deslogado).
export default async function Header() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    return (
        <header className="header">
            <nav>
                <ul>
                    <li>
                        <Link href="/">/tech/</Link>
                    </li>
                    {token && (
                        <li>
                            <Link href="/meus-posts">Meus posts</Link>
                        </li>
                    )}
                </ul>
            </nav>

            <div>
                <ul>
                    {!token && (
                        <>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/create">Criar Conta</Link>
                            </li>
                        </>
                    )}
                    {token && (
                        <li><Logout /></li>
                    )}
                </ul>
            </div>
        </header>
    );
}

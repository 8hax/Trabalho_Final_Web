import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getThread } from "@/services/thread.services";
import PostCard from "@/componentes/PostCard/PostCard";
import PostComposer from "@/componentes/PostComposer/PostComposer";
import styles from "@/app/tech/thread/thread.module.css";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ThreadPage({ params }: Props) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/login");
    }

    const { id } = await params;
    const cookieHeader = cookieStore.toString();

    let thread;
    try {
        thread = await getThread(id, cookieHeader);
    } catch {
        // thread inexistente ou sessão inválida -> volta pra home
        // (se o token tiver expirado, a home então redireciona para /login)
        redirect("/");
    }

    return (
        <main className={styles.thread}>
            <Link href="/" className={styles.voltar}>← voltar</Link>

            <header className={styles.threadHeader}>
                <h1>{thread.title}</h1>
                <p>{thread.description}</p>
            </header>

            <section className={styles.posts}>
                {thread.posts.length === 0 ? (
                    <p className={styles.vazio}>Nenhum post ainda. Seja o primeiro!</p>
                ) : (
                    thread.posts.map((post) => <PostCard key={post.id} post={post} />)
                )}
            </section>

            <PostComposer threadId={thread.id} />
        </main>
    );
}

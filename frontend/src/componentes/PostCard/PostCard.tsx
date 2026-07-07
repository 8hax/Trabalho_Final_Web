import { PostWithAuthor } from "@/tipos/post";
import "@/componentes/PostCard/PostCard.css";

interface PostCardProps {
    post: PostWithAuthor;
}

function formatarData(iso: string) {
    return new Date(iso).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Post no feed da thread. Presentational (sem interatividade): o deletar mora em /meus-posts,
// onde a posse do post é garantida (o backend não tem GET /auth/me para descobrir o usuário atual aqui).
export default function PostCard({ post }: PostCardProps) {
    const numero = post.id.slice(0, 8); // nº curto estilo chan a partir do uuid

    return (
        <article className="post-card">
            <header className="post-card-head">
                <span className="post-author">{post.author.username}</span>
                {post.author.isAI && <span className="post-badge-ia">IA</span>}
                <span className="post-num">No.{numero}</span>
                <span className="post-date">{formatarData(post.createdAt)}</span>
            </header>

            {post.imageUrl && (
                // URL arbitrária do usuário (host/dimensão desconhecidos): <img> puro é mais robusto que next/image.
                // eslint-disable-next-line @next/next/no-img-element
                <img className="post-image" src={post.imageUrl} alt="Imagem do post" />
            )}

            <p className="post-content">{post.content}</p>
        </article>
    );
}

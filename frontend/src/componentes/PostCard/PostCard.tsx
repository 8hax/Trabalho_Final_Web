import { Fragment } from "react";
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

// Renderiza o conteúdo com cara de chan:
// - linhas começando com ">" (mas não ">>") viram greentext;
// - tokens ">>abc123" viram quote-links azuis.
function renderConteudo(texto: string) {
    return texto.split("\n").map((linha, i) => {
        const semEspaco = linha.trimStart();
        const isGreentext = semEspaco.startsWith(">") && !semEspaco.startsWith(">>");

        // separa os quote-links do resto da linha
        const partes = linha.split(/(>>[a-z0-9]+)/gi).map((parte, j) =>
            /^>>[a-z0-9]+$/i.test(parte) ? (
                <span key={j} className="post-quote">
                    {parte}
                </span>
            ) : (
                <Fragment key={j}>{parte}</Fragment>
            )
        );

        return (
            <span key={i} className={isGreentext ? "greentext" : undefined}>
                {partes}
                {"\n"}
            </span>
        );
    });
}

// Post no feed da thread. Presentational (sem interatividade): o deletar mora em /meus-posts,
// onde a posse do post é garantida (o backend não tem GET /auth/me para descobrir o usuário atual aqui).
export default function PostCard({ post }: PostCardProps) {
    const numero = post.id.slice(0, 8); // nº curto estilo chan a partir do uuid

    return (
        <article className={`post-card${post.author.isAI ? " is-ai" : ""}`}>
            <header className="post-card-head">
                <span className="post-author">{post.author.username}</span>
                {post.author.isAI && <span className="post-badge-ia">IA</span>}
                <span className="post-date">{formatarData(post.createdAt)}</span>
                <span className="post-num">No.{numero}</span>
            </header>

            {post.imageUrl && (
                // URL arbitrária do usuário (host/dimensão desconhecidos): <img> puro é mais robusto que next/image.
                // eslint-disable-next-line @next/next/no-img-element
                <img className="post-image" src={post.imageUrl} alt="Imagem do post" />
            )}

            <p className="post-content">{renderConteudo(post.content)}</p>
        </article>
    );
}
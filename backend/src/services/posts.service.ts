import prisma from "../lib/prisma";


export class PostsServices{
    async create(content: string, threadId: string, authorId: string, imageUrl?: string){
        return prisma.post.create({
            data:{
                content,
                threadId,
                authorId,
                imageUrl,
            },
            include:{
                author:{
                    select:{
                        id: true,
                        username: true,
                        isAI: true,
                    }
                }
            }
        })
    };

    async delete(postId: string, authorId: string, isAdmin: boolean) {
        const post = await prisma.post.findUnique({
        where: { id: postId }
        })

        if (!post) {
            throw new Error('Post não encontrado')
        }

        // admin pode deletar qualquer post, autor só o próprio
        if (!isAdmin && post.authorId !== authorId) {
            throw new Error('Você não tem permissão para deletar este post')
        }

        return prisma.post.delete({
        where: { id: postId }
        });
    };

    async findById(postId: string){
        return prisma.post.findUnique({
            where: {id: postId},
            include:{
                author: {
                    select:{
                        id: true,
                        username: true,
                        isAI: true,
                    }
                },
                replies: true,
            }
        });
    };

    async findAllByThread(threadId: string){
        return prisma.post.findMany({
            where: {threadId},
            orderBy: {createdAt: 'asc'},
            include:{
                author:{
                    select:{
                        id: true,
                        username: true,
                        isAI: true,
                    }
                }
            }
        });
    };

    async findPostsByUser(userId: string){
        return prisma.post.findMany({
            where: {authorId: userId},
            orderBy: {createdAt: 'desc'},
            include:{
                thread:{
                    select: {id: true, title: true, slug: true}
                }
            }
        });
    };

    //eu não quero permitir edição de posts, uma vez postado, já era!
}
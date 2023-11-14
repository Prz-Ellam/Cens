import Comment from '@/models/comment.model';

export default class CommentService {
    static async findOneById(id: number): Promise<Comment | null> {
        // return await Comment.createQueryBuilder('comment')
        //    .leftJoinAndSelect('comment.user', 'user')
        //    .leftJoinAndSelect('comment.poll', 'poll')
        //    .where('comment.id = :id', { id })
        //    .getOne();

        return await Comment.findOne({
            where: { id },
            relations: ['user'],
        });
    }
}

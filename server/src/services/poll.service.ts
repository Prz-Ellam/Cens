import { connection } from '@/config/database';
import { OptionWithPercentage } from '@/models/options-with-percentage.model';
import Poll from '@/models/poll.model';
import User from '@/models/user.model';

export default class PollService {
    static async findOneById(id: number): Promise<Poll | null> {
        const repository = connection.getRepository(Poll);
        return await repository
            .createQueryBuilder('poll')
            .leftJoinAndSelect('poll.user', 'user')
            .leftJoinAndMapMany(
                'poll.options',
                OptionWithPercentage,
                'options',
                'poll.id = options.poll_id',
            )
            .where('poll.id = :id', { id })
            .getOne();
    }

    static async findMany(): Promise<Poll[]> {
        const repository = connection.getRepository(Poll);
        return await repository
            .createQueryBuilder('poll')
            .leftJoinAndSelect('poll.user', 'user')
            .leftJoinAndSelect('poll.comments', 'comments')
            .leftJoinAndSelect('poll.reactions', 'reactions')
            .leftJoinAndMapMany(
                'poll.options',
                OptionWithPercentage,
                'options',
                'poll.id = options.poll_id',
            )
            .getMany();
    }
}

import Poll from '@/models/poll.model';

export default class PollService {
    static async findOneById(id: number): Promise<Poll | null> {
        return await Poll.findOne({
            where: {
                id,
            },
            relations: ['options', 'user'],
        });
    }
}

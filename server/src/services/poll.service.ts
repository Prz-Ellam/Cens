import { connection } from '@/config/database';
import logger from '@/config/logger';
import Comment from '@/models/comment.model';
import Follower from '@/models/follower.model';
import { OptionWithPercentage } from '@/models/options-with-percentage.model';
import Poll from '@/models/poll.model';
import Reaction from '@/models/reaction.model';
import User from '@/models/user.model';
import Vote from '@/models/vote.model';

export default class PollService {
    static async findOneById(id: number, userId: number): Promise<unknown> {
        const repository = connection.getRepository(Poll);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const poll: any = await repository
            .createQueryBuilder('poll')
            .leftJoinAndSelect('poll.user', 'user')
            .where('poll.id = :id', { id })
            .getOne();

        const reactionsResult = await connection
            .getRepository(Reaction)
            .createQueryBuilder('reaction')
            .select('reaction.poll_id', 'pollId')
            .addSelect('SUM(reaction.is_like = 1)', 'likes')
            .addSelect('SUM(reaction.is_like = 0)', 'dislikes')
            .where('reaction.poll_id = :pollId', { pollId: poll.id })
            .groupBy('reaction.poll_id')
            .getRawOne();

        let reactions: { likes: number; dislikes: number } = {
            likes: 0,
            dislikes: 0,
        };
        if (reactionsResult) {
            reactions = {
                likes: Number.parseInt(reactionsResult.likes),
                dislikes: Number.parseInt(reactionsResult.dislikes),
            };
        }

        const comments = await Comment.count({
            where: {
                poll: { id: poll.id },
            },
        });

        const options = await connection
            .getRepository(OptionWithPercentage)
            .find({
                where: {
                    poll_id: poll.id,
                },
            });

        const hasDisliked = await Reaction.countBy({
            user: {
                id: userId,
            },
            poll: {
                id: poll.id,
            },
            isLike: false,
        });

        const hasLiked = await Reaction.countBy({
            user: {
                id: userId,
            },
            poll: {
                id: poll.id,
            },
            isLike: true,
        });

        const vote = await Vote.findOne({
            where: {
                user: {
                    id: userId,
                },
                poll: {
                    id: poll.id,
                },
            },
            relations: ['option'],
        });

        const voteCount = await Vote.countBy({
            poll: {
                id: poll.id,
            },
        });

        const reaction = await Reaction.findOneBy({
            user: { id: userId },
            poll: { id: poll.id },
        });

        poll.reactions = reactions;
        poll.comments = comments;
        poll.options = options;
        poll.hasLiked = hasLiked;
        poll.hasDisliked = hasDisliked;
        poll.vote = vote;
        poll.reaction = reaction;
        poll.voteCount = voteCount;

        console.timeEnd('A');
        return poll;
    }

    static async findMany(
        userId: number,
        search: string,
        page: number,
        limit: number,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<any[]> {
        const repository = connection.getRepository(Poll);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [polls, total]: any = await repository
            .createQueryBuilder('poll')
            .leftJoinAndSelect('poll.user', 'user')
            .where('poll.question LIKE :search', {
                search: `%${search}%`,
            })
            .orWhere('poll.description LIKE :search', {
                search: `%${search}%`,
            })
            .orderBy('poll.created_at', 'DESC')
            .limit(limit)
            .offset((page - 1) * limit)
            .getManyAndCount();

        for (let i = 0; i < polls.length; i++) {
            const reactionsResult = await connection
                .getRepository(Reaction)
                .createQueryBuilder('reaction')
                .select('reaction.poll_id', 'pollId')
                .addSelect('SUM(reaction.is_like = 1)', 'likes')
                .addSelect('SUM(reaction.is_like = 0)', 'dislikes')
                .where('reaction.poll_id = :pollId', { pollId: polls[i].id })
                .groupBy('reaction.poll_id')
                .getRawOne();

            let reactions: { likes: number; dislikes: number } = {
                likes: 0,
                dislikes: 0,
            };
            if (reactionsResult) {
                reactions = {
                    likes: Number.parseInt(reactionsResult.likes),
                    dislikes: Number.parseInt(reactionsResult.dislikes),
                };
            }

            const comments = await Comment.count({
                where: {
                    poll: { id: polls[i].id },
                },
            });

            const options = await connection
                .getRepository(OptionWithPercentage)
                .find({
                    where: {
                        poll_id: polls[i].id,
                    },
                });

            const hasDisliked = await Reaction.countBy({
                user: {
                    id: userId,
                },
                poll: {
                    id: polls[i].id,
                },
                isLike: false,
            });

            const hasLiked = await Reaction.countBy({
                user: {
                    id: userId,
                },
                poll: {
                    id: polls[i].id,
                },
                isLike: true,
            });

            const vote = await Vote.findOne({
                where: {
                    user: {
                        id: userId,
                    },
                    poll: {
                        id: polls[i].id,
                    },
                },
                relations: ['option'],
            });

            const voteCount = await Vote.countBy({
                poll: {
                    id: polls[i].id,
                },
            });

            const reaction = await Reaction.findOneBy({
                user: { id: userId },
                poll: { id: polls[i].id },
            });

            polls[i].reactions = reactions;
            polls[i].comments = comments;
            polls[i].options = options;
            polls[i].hasLiked = hasLiked;
            polls[i].hasDisliked = hasDisliked;
            polls[i].vote = vote;
            polls[i].reaction = reaction;
            polls[i].voteCount = voteCount;
        }

        return [polls, total];
    }

    static async findByFollowed(
        userId: number,
        page: number,
        limit: number,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<any[]> {
        try {
            const userIds = connection
                .getRepository(User)
                .createQueryBuilder('user')
                .select('user.id')
                .innerJoin(
                    Follower,
                    'follower',
                    'user.id = follower.followed_user_id',
                )
                .where('follower.follower_user_id = :userId', {
                    userId,
                });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const [polls, total]: any = await connection
                .getRepository(Poll)
                .createQueryBuilder('poll')
                .leftJoinAndSelect('poll.user', 'user')
                .where(`poll.user_id IN (${userIds.getQuery()})`)
                .setParameters(userIds.getParameters())
                .orderBy('poll.created_at', 'DESC')
                .limit(limit)
                .offset((page - 1) * limit)
                .getManyAndCount();

            for (let i = 0; i < polls.length; i++) {
                const reactionsResult = await connection
                    .getRepository(Reaction)
                    .createQueryBuilder('reaction')
                    .select('reaction.poll_id', 'pollId')
                    .addSelect('SUM(reaction.is_like = 1)', 'likes')
                    .addSelect('SUM(reaction.is_like = 0)', 'dislikes')
                    .where('reaction.poll_id = :pollId', {
                        pollId: polls[i].id,
                    })
                    .groupBy('reaction.poll_id')
                    .getRawOne();

                let reactions: { likes: number; dislikes: number } = {
                    likes: 0,
                    dislikes: 0,
                };
                if (reactionsResult) {
                    reactions = {
                        likes: Number.parseInt(reactionsResult.likes),
                        dislikes: Number.parseInt(reactionsResult.dislikes),
                    };
                }

                const comments = await Comment.count({
                    where: {
                        poll: { id: polls[i].id },
                    },
                });

                const options = await connection
                    .getRepository(OptionWithPercentage)
                    .find({
                        where: {
                            poll_id: polls[i].id,
                        },
                    });

                const hasDisliked = await Reaction.countBy({
                    user: {
                        id: userId,
                    },
                    poll: {
                        id: polls[i].id,
                    },
                    isLike: false,
                });

                const hasLiked = await Reaction.countBy({
                    user: {
                        id: userId,
                    },
                    poll: {
                        id: polls[i].id,
                    },
                    isLike: true,
                });

                const vote = await Vote.findOne({
                    where: {
                        user: {
                            id: userId,
                        },
                        poll: {
                            id: polls[i].id,
                        },
                    },
                    relations: ['option'],
                });

                const voteCount = await Vote.countBy({
                    poll: {
                        id: polls[i].id,
                    },
                });

                const reaction = await Reaction.findOneBy({
                    user: { id: userId },
                    poll: { id: polls[i].id },
                });

                polls[i].reactions = reactions;
                polls[i].comments = comments;
                polls[i].options = options;
                polls[i].hasLiked = hasLiked;
                polls[i].hasDisliked = hasDisliked;
                polls[i].vote = vote;
                polls[i].reaction = reaction;
                polls[i].voteCount = voteCount;
            }

            return [polls, total];
        } catch (error) {
            logger.error(`${error as string}`);
            return [];
        }
    }

    static async findByUser(
        userId: number,
        authUserId: number,
        page: number,
        limit: number,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<any[]> {
        // const repository = connection.getRepository(Poll);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // const polls: any = await repository
        //     .createQueryBuilder('poll')
        //     .leftJoinAndSelect('poll.user', 'user')
        //     .where('poll.user_id = :userId', { userId })
        //     .orderBy('poll.created_at', 'DESC')
        //     .limit(limit)
        //     .offset((page - 1) * limit)
        //     .getMany();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [polls, total]: any = await Poll.findAndCount({
            where: {
                user: { id: userId },
            },
            relations: ['user'],
            order: {
                createdAt: 'DESC',
            },
            take: limit,
            skip: (page - 1) * limit,
        });

        for (let i = 0; i < polls.length; i++) {
            const reactionsResult = await connection
                .getRepository(Reaction)
                .createQueryBuilder('reaction')
                .select('reaction.poll_id', 'pollId')
                .addSelect('SUM(reaction.is_like = 1)', 'likes')
                .addSelect('SUM(reaction.is_like = 0)', 'dislikes')
                .where('reaction.poll_id = :pollId', { pollId: polls[i].id })
                .groupBy('reaction.poll_id')
                .getRawOne();

            let reactions: { likes: number; dislikes: number } = {
                likes: 0,
                dislikes: 0,
            };
            if (reactionsResult) {
                reactions = {
                    likes: Number.parseInt(reactionsResult.likes),
                    dislikes: Number.parseInt(reactionsResult.dislikes),
                };
            }

            const comments = await Comment.count({
                where: {
                    poll: { id: polls[i].id },
                },
            });

            const options = await connection
                .getRepository(OptionWithPercentage)
                .find({
                    where: {
                        poll_id: polls[i].id,
                    },
                });

            const hasDisliked = await Reaction.countBy({
                user: {
                    id: authUserId,
                },
                poll: {
                    id: polls[i].id,
                },
                isLike: false,
            });

            const hasLiked = await Reaction.countBy({
                user: {
                    id: authUserId,
                },
                poll: {
                    id: polls[i].id,
                },
                isLike: true,
            });

            const vote = await Vote.findOne({
                where: {
                    user: {
                        id: authUserId,
                    },
                    poll: {
                        id: polls[i].id,
                    },
                },
                relations: ['option'],
            });

            const voteCount = await Vote.countBy({
                poll: {
                    id: polls[i].id,
                },
            });

            const reaction = await Reaction.findOneBy({
                user: { id: authUserId },
                poll: { id: polls[i].id },
            });

            polls[i].reactions = reactions;
            polls[i].comments = comments;
            polls[i].options = options;
            polls[i].hasLiked = hasLiked;
            polls[i].hasDisliked = hasDisliked;
            polls[i].vote = vote;
            polls[i].reaction = reaction;
            polls[i].voteCount = voteCount;
        }

        return [polls, total];
    }
}

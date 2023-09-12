import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import Poll from './poll.model';
import User from './user.model';
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity({ name: 'reactions' })
// @Unique('UQ_username_email', ['user', 'poll'])
export default class Reaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isLike: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    @Exclude({ toPlainOnly: true })
    deletedAt: Date;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => Poll, (poll) => poll.id)
    poll: Poll;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    toJSON() {
        return instanceToPlain(this);
    }
}

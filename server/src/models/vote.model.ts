import {
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Poll from './poll.model';
import User from './user.model';
import Option from './option.model';
import { Exclude } from 'class-transformer';

@Entity({ name: 'votes' })
export default class Vote extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Poll, (poll) => poll.id)
    poll: Poll;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => Option, (option) => option.id)
    option: Option;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    @Exclude({ toPlainOnly: true })
    deletedAt: Date;
}

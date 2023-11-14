import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    Column,
    OneToMany,
} from 'typeorm';
import User from './user.model';
import Option from './option.model';
import { Exclude, instanceToPlain } from 'class-transformer';
import Comment from './comment.model';
import Reaction from './reaction.model';

@Entity({ name: 'polls' })
export default class Poll extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Option, (option) => option.poll)
    options: Option[];

    @OneToMany(() => Comment, (comment) => comment.poll)
    comments: Comment[];

    @OneToMany(() => Reaction, (reactions) => reactions.poll)
    reactions: Reaction[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    @Exclude({ toPlainOnly: true })
    deletedAt: Date;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    toJSON() {
        return instanceToPlain(this);
    }
}

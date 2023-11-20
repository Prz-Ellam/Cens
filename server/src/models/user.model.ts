import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';
import Country from './country.model';
import Poll from './poll.model';
import Reaction from './reaction.model';
import Comment from './comment.model';
import Vote from './vote.model';
import Participant from './participant.model';
import Message from './message.model';
import MessageView from './message-view.model';
import Follower from './follower.model';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({
        nullable: true,
        type: 'date',
    })
    birthDate: Date;

    @Column({
        nullable: true,
        type: 'enum',
        enum: ['masculino', 'femenino', 'otro'],
    })
    gender: string;

    @Column({
        nullable: true,
    })
    avatar: string;

    @ManyToOne(() => Country, (country) => country.id)
    country: Country | null;

    @OneToMany(() => Poll, (poll) => poll.user, { cascade: ['soft-remove'] })
    polls: Poll[];

    @OneToMany(() => Reaction, (reaction) => reaction.user, {
        cascade: ['soft-remove'],
    })
    reactions: Reaction[];

    @OneToMany(() => Comment, (comment) => comment.user, {
        cascade: ['soft-remove'],
    })
    comments: Comment[];

    @OneToMany(() => Vote, (vote) => vote.user, {
        cascade: ['soft-remove'],
    })
    votes: Vote[];

    @OneToMany(() => Participant, (participant) => participant.user, {
        cascade: ['soft-remove'],
    })
    participants: Participant[];

    @OneToMany(() => Message, (messages) => messages.sender, {
        cascade: ['soft-remove'],
    })
    messages: Message[];

    @OneToMany(() => Follower, (followers) => followers.followedUser, {
        cascade: ['soft-remove'],
    })
    followers: Follower[];

    @OneToMany(() => Follower, (followed) => followed.followerUser, {
        cascade: ['soft-remove'],
    })
    followed: Follower[];

    @OneToMany(() => MessageView, (messageViews) => messageViews.user, {
        cascade: ['soft-remove'],
    })
    messageViews: MessageView[];

    @CreateDateColumn()
    @Exclude({ toPlainOnly: true })
    createdAt: Date;

    @UpdateDateColumn()
    @Exclude({ toPlainOnly: true })
    updatedAt: Date;

    @DeleteDateColumn()
    @Exclude({ toPlainOnly: true })
    deletedAt: Date;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    toJSON() {
        return instanceToPlain(this);
    }
}

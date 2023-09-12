import { Exclude, instanceToPlain } from 'class-transformer';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Conversation from './conversation.model';
import User from './user.model';

@Entity()
export default class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => Conversation, (conversation) => conversation.id)
    conversation: Conversation;

    @ManyToOne(() => User, (user) => user.id)
    sender: User;

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

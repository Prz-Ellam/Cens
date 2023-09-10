import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Conversation from './conversation.model';
import User from './user.model';

@Entity({ name: 'participants' })
export default class Participant extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => Conversation, (conversation) => conversation.id)
    conversation: Conversation;
}

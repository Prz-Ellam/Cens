import {
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Conversation from './conversation.model';
import User from './user.model';
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity({ name: 'participants' })
export default class Participant extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Conversation, (conversation) => conversation.id)
    conversation: Conversation;

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

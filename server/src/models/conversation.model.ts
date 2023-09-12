import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Participant from './participant.model';

@Entity({ name: 'conversations' })
export default class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Participant, (participant) => participant.conversation)
    participants: Participant[];

    @CreateDateColumn()
    createdAt: Date;
}

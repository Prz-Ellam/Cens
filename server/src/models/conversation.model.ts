import {
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Participant from './participant.model';
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity({ name: 'conversations' })
export default class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Participant, (participant) => participant.conversation)
    participants: Participant[];

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

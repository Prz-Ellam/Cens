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

@Entity({ name: 'polls' })
export default class Poll extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @OneToMany(() => Option, (option) => option.poll)
    options: Option[];

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

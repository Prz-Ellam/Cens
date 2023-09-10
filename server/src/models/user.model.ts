import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
} from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';
import Country from './country.model';

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
    country: Country;

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

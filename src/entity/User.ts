import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
} from "typeorm";
import { Reminder } from "./Reminder";
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    subscription: boolean;

    @OneToMany(() => Reminder, (reminder) => reminder.user, { eager: true })
    reminders: Reminder[];
}

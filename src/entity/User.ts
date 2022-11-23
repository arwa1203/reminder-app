import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
} from "typeorm";
import { Reminder } from "../entity/Reminders";
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    subscription: boolean;

    @OneToMany(() => Reminder, (reminder) => reminder.userId)
    reminder: Reminder[];
}

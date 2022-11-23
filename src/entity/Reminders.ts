import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity,
    CreateDateColumn,
    JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Reminder extends BaseEntity {
    @PrimaryGeneratedColumn()
    reminderId: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdDate: Date;

    @Column()
    frequency: number;

    @Column()
    userId: number;
    @ManyToOne(() => User, (user) => user.reminder)
    @JoinColumn({ name: "userId" })
    user: User;
}

import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import User from './User';

@Entity()
class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int", { nullable: true })
    userId: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column({ default: true })
    valid: boolean;

    @Column()
    userAgent: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}

export default Session;
import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt'
import config from '../config';

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeUpdate()
    async beforeUpdate() {
        await this.hashPassword();
    }

    @BeforeInsert()
    async beforeInsert() {
        await this.hashPassword();
    }

    async hashPassword() {
        const salt = await bcrypt.genSalt(config.bcrypt.saltWorkFactor);
        const hash = await bcrypt.hashSync(this.password, salt);
        this.password = hash;
    }

    public async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password).catch((e) => false);
    }
}

export default User;
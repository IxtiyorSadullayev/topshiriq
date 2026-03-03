import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity()
export class Contact {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    fam: string;

    @Column()
    tel: string;

    @Column()
    email: string;

    @Column()
    about: string;

    @Column()
    favorite: boolean;

    @Column()
    imgUrl: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}

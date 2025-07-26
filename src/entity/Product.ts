import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('decimal')
    value: number

    @DeleteDateColumn()
    deletedAt: Date;

}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('domicilios_persona')
export class DomiciliosPersona {

    @PrimaryGeneratedColumn()
    id_domicilio: number;

    @Column({ type: 'varchar', length: 150 })
    calle: string;

    @Column({ type: 'varchar', length: 10 })
    numero_exterior: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    numero_interior?: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: true })
    created_by: string;

    @Column({ nullable: true })
    updated_by: string;

    @DeleteDateColumn()
    deletedAt: Date;


}

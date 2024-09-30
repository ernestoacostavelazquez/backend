import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('personas_fisicas')
export class PersonasFisica {
    @PrimaryGeneratedColumn()
    id_persona_fisica: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 100 })
    apellido_paterno: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    apellido_materno: string;

    @Column({ type: 'date' })
    fecha_nacimiento: Date;

    @Column({ type: 'varchar', length: 150, unique: true, nullable: true })
    correo_electronico: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    telefono: string;

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

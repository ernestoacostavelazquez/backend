import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('personas_morales')
export class PersonasMorales {
    @PrimaryGeneratedColumn()
    id_persona_morales: number;

    @Column({ type: 'varchar', length: 100 })
    razon_social: string;

    @Column({ type: 'varchar', length: 100 })
    nombre_comercial: string;

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

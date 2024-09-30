import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('maestro_personas')
export class MaestroPersona {

    @PrimaryGeneratedColumn()
    id_persona: number;
    
    @Column({ unique:true, type: 'varchar', length: 13, nullable: true })
    rfc:string;
  
    @Column({ type: 'enum', enum: ['Activo', 'Inactivo'], default: 'Activo' })
    estatus: string;

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

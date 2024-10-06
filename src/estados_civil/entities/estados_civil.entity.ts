import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';

@Entity('estados_civil')
export class EstadosCivil {

    @PrimaryGeneratedColumn()
    id_estado_civil: number;

     @Column({ type: 'varchar', length: 50 })
    nombre_estado: string;

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

    @Column({ type: 'boolean', default: true })
    estatus: boolean;

    @OneToMany(() => MaestroPersona, persona => persona.estado_civil)
    personas: MaestroPersona[];  

}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';

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

    @Column({ type: 'boolean', default: true })
    estatus: boolean;

    // Relación uno a uno con la tabla maestro_personas
    @OneToOne(() => MaestroPersona, persona => persona.persona_moral)
    persona: MaestroPersona;


}

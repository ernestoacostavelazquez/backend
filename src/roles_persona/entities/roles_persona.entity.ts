import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';
import { Rol } from 'src/roles/entities/role.entity';

@Entity('roles_persona')
export class RolesPersona {

    @PrimaryGeneratedColumn()
    id_rol_persona: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_asignacion: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: true})
    created_by: string;

    @Column({ nullable: true})
    updated_by: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ type: 'boolean', default: true})
    estatus: boolean;

    @ManyToOne(() => MaestroPersona, persona => persona.roles)
    @JoinColumn({ name: 'id_persona' })
    persona: MaestroPersona;

    @ManyToOne(() => Rol, rol => rol.roles_persona)
    @JoinColumn({ name: 'id_rol' })
    rol: Rol;

}

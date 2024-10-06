import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { RolesPersona } from 'src/roles_persona/entities/roles_persona.entity';

@Entity('roles')
export class Rol {
    @PrimaryGeneratedColumn()
    id_rol: number;

    @Column({ type: 'varchar', length: 50 })
    nombre_rol: string;

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

    @OneToMany(() => RolesPersona, rolPersona => rolPersona.rol)
    roles_persona: RolesPersona[];
   
}

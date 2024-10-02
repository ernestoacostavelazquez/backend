import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { DomiciliosPersona } from 'src/domicilios_persona/entities/domicilios_persona.entity';

@Entity('tipos_domicilios')
export class TiposDomicilio {
    @PrimaryGeneratedColumn()
    id_tipo_domicilio: number;

    @Column({ type: 'varchar', length: 50 })
    nombre_tipo_domicilio: string;

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

    @OneToMany(() => DomiciliosPersona, domicilio => domicilio.tipo_domicilio)
    domicilios: DomiciliosPersona[];  

}

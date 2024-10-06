import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';
import { TiposDomicilio } from 'src/tipos_domicilios/entities/tipos_domicilio.entity';
import { CodigosPostal } from 'src/codigos_postales/entities/codigos_postale.entity';


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

    @Column({ type: 'boolean', default: true })
    estatus: boolean;

    @ManyToOne(() => MaestroPersona, persona => persona.domicilios)
    @JoinColumn({ name: 'id_persona' })
    persona: MaestroPersona;

    @ManyToOne(() => CodigosPostal, codigo => codigo.domicilios)
    @JoinColumn({ name: 'id_codigo_postal' })
    codigo_postal: CodigosPostal;

    @ManyToOne(() => TiposDomicilio, tipo => tipo.domicilios)
    @JoinColumn({ name: 'id_tipo_domicilio' })
    tipo_domicilio: TiposDomicilio;

  
}

import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { PersonasFisica } from 'src/personas_fisicas/entities/personas_fisica.entity'; 
import { PersonasMorales } from 'src/personas_morales/entities/personas_morale.entity'; 
import { DomiciliosPersona } from 'src/domicilios_persona/entities/domicilios_persona.entity'; 
import { RolesPersona } from 'src/roles_persona/entities/roles_persona.entity';
import { Genero } from 'src/generos/entities/genero.entity'; 
import { TiposPersona } from 'src/tipos_persona/entities/tipos_persona.entity'; 
import { EstadosCivil } from 'src/estados_civil/entities/estados_civil.entity'; 

@Entity('maestro_personas')
export class MaestroPersona {

    @PrimaryGeneratedColumn()
    id_persona: number;
    
    @Column({ unique:true, type: 'varchar', length: 13, nullable: true })
    rfc:string;
  
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

    @OneToOne(() => PersonasFisica)
    @JoinColumn({ name: 'id_persona_fisica' })
    persona_fisica: PersonasFisica;

    @OneToOne(() => PersonasMorales)
    @JoinColumn({ name: 'id_persona_morales' })
    persona_moral: PersonasMorales;

    @OneToMany(() => DomiciliosPersona, domicilio => domicilio.persona)
    domicilios: DomiciliosPersona[];

    @OneToMany(() => RolesPersona, rol => rol.persona)
    roles: RolesPersona[];

    @ManyToOne(() => Genero, genero => genero.personas)
    @JoinColumn({ name: 'id_genero' })
    genero: Genero;

    @ManyToOne(() => TiposPersona, tipo => tipo.personas)
    @JoinColumn({ name: 'id_tipo_persona' })
    tipo_persona: TiposPersona;

    @ManyToOne(() => EstadosCivil, estado => estado.personas)
    @JoinColumn({ name: 'id_estado_civil' })
    estado_civil: EstadosCivil;

   


}

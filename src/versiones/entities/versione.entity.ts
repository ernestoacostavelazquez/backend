// versione.entity.ts
import { Modelo } from 'src/modelos/entities/modelo.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('versiones')
  export class Versione {
    @PrimaryGeneratedColumn()
    id_version: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_version: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion_version: string;
  
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

    @Column({ type: 'boolean', default: true })
    estatus: boolean;

    // Relación ManyToOne con Modelo
    @ManyToOne(() => Modelo, modelo => modelo.versione)
    @JoinColumn({ name: 'id_modelo' })  // Clave foránea
    modelo: Modelo;
   
  }
  
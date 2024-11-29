// modelo.entity.ts
import { Familia } from 'src/familias/entities/familia.entity';
import { Versione } from 'src/versiones/entities/versione.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity('modelos')
  export class Modelo {
    @PrimaryGeneratedColumn()
    id_modelo: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_modelo: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion_modelo: string;
  
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

    @ManyToOne(() => Familia, (familia) => familia.modelos, { nullable: false })
    @JoinColumn({ name: 'id_familia' })
    familia: Familia;

     // Relación uno a muchos con Versione (modelo tiene muchas versiones)
    @OneToMany(() => Versione, (versione) => versione.modelo)
    versiones: Versione[];

  }
  
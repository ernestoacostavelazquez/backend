//tipos_caja.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  
  @Entity('tipos_caja')
  export class TiposCaja {
    @PrimaryGeneratedColumn()
    id_tipo_caja: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_caja: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion_caja: string;
  
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

  
  }
  
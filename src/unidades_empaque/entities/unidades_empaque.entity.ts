// unidades_empaque.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  
  @Entity('unidades_empaque')
  export class UnidadesEmpaque {
    @PrimaryGeneratedColumn()
    id_empaque: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_empaque: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion_empaque: string;

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
  
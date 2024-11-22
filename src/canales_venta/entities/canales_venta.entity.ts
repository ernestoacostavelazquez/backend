// canales_venta.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  
  @Entity('canales_venta')
  export class CanalesVenta {
    @PrimaryGeneratedColumn()
    id_canal_venta: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_canal: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion_canal: string;

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

    @Column({ type: 'boolean', default: true})
    estatus: boolean;

  
    
  }
  
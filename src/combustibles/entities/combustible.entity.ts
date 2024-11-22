// combustible.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  
  @Entity('combustibles')
  export class Combustible {
    @PrimaryGeneratedColumn()
    id_combustible: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_combustible: string;

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
  
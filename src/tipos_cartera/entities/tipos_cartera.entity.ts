// tipos_cartera.entity.ts
import { Cartera } from 'src/carteras/entities/cartera.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity('tipos_cartera')
  export class TiposCartera {
    @PrimaryGeneratedColumn()
    id_tipo_cartera: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_tipo_cartera: string;
  
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

    // Relación OneToMany con Carteras
    @OneToMany(() => Cartera, cartera => cartera.tiposCartera)
    cartera: Cartera[];
  }
  
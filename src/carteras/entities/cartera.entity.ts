// cartera.entity.ts
import { TiposCartera } from 'src/tipos_cartera/entities/tipos_cartera.entity';
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
  
  @Entity('carteras')
  export class Cartera {
    @PrimaryGeneratedColumn()
    id_cartera: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_cartera: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion_cartera: string;

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
  
    @ManyToOne(() => TiposCartera, (tiposCartera) => tiposCartera.carteras, { nullable: false })
    @JoinColumn({ name: 'id_tipo_cartera' })
    tipo_cartera: TiposCartera;
    
  }
  
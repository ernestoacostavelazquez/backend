// marca.entity.ts
import { Armadora } from 'src/armadoras/entities/armadora.entity';
import { Familia } from 'src/familias/entities/familia.entity';
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
  
  @Entity('marcas')
  export class Marca {
    @PrimaryGeneratedColumn()
    id_marca: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_marca: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion_marca: string;
  
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

    @ManyToOne(() => Armadora, (armadora) => armadora.marcas, { nullable: false })
    @JoinColumn({ name: 'id_armadora' })
    armadora: Armadora;

    @OneToMany(() => Familia, (familia) => familia.marca)
    familias: Familia[];
  }
  
// armadora.entity.ts
import { Marca } from 'src/marcas/entities/marca.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity('armadoras')
  export class Armadora {
    @PrimaryGeneratedColumn()
    id_armadora: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_armadora: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion_armadora: string;
  
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
    
    // Relación OneToMany con Marcas
    @OneToMany(() => Marca, marca => marca.armadora)
    marca: Marca[];
     
  }
  
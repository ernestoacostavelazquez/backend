// familia.entity.ts
import { Marca } from 'src/marcas/entities/marca.entity';
import { Modelo } from 'src/modelos/entities/modelo.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('familias')
  export class Familia {
    @PrimaryGeneratedColumn()
    id_familia: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_familia: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion_familia: string;
  
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

    @ManyToOne(() => Marca, (marca) => marca.familias, { nullable: false })
    @JoinColumn({ name: 'id_marca' })
    marca: Marca;

    @OneToMany(() => Modelo, (modelo) => modelo.familia)
    modelos: Modelo[];
  
  }
  
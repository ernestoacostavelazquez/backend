// sub-categoria.entity.ts
import { Categoria } from 'src/categorias/entities/categoria.entity';
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
  
  @Entity('sub_categorias')
  export class SubCategoria {
    @PrimaryGeneratedColumn()
    id_sub_categoria: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_sub_categoria: string;
  
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

    @ManyToOne(() => Categoria, (categoria) => categoria.sub_categorias, { nullable: false })
    @JoinColumn({ name: 'id_categoria' })
    categoria: Categoria;

  }
  
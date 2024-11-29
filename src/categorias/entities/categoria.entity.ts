// categoria.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { MaestroParte } from 'src/maestro_partes/entities/maestro_parte.entity';
import { SubCategoria } from 'src/sub-categorias/entities/sub-categoria.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ type: 'varchar', length: 100 })
  nombre_categoria: string;

  @Column({ type: 'text', nullable: true})
  descripcion_categoria: string;

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

  @Column({ type: 'boolean', default: true})
  estatus: boolean;

  @OneToMany(() => MaestroParte, parte => parte.categoria)
  maestro_partes: MaestroParte[];

  @OneToMany(() => SubCategoria, (subCategoria) => subCategoria.categoria)
  sub_categorias: SubCategoria[];
  
  
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PartesAlmacen } from 'src/partes_almacen/entities/partes_almacen.entity';
import { UnidadMedida } from 'src/unidad_medida/entities/unidad_medida.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Entity('maestro_partes')
export class MaestroParte {
    @PrimaryGeneratedColumn()
    id_parte: number;
  
    @Column({ type: 'varchar', length: 50 })
    codigo_parte: string;
  
    @Column({ type: 'varchar', length: 100 })
    nombre_parte: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_unitario: number;
  
    @Column({ type: 'int', default: 0 })
    stock_actual: number;
  
    @Column({ type: 'int', default: 0 })
    stock_minimo: number;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    numero_parte_fabricante: string;
  
    // Cambiar el tipo a 'TIMESTAMP' o 'DATETIME'
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_alta: Date;
  
    @Column({ type: 'enum', enum: ['Activo', 'Inactivo'], default: 'Activo' })
    estatus: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    garantia: string;

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

    @OneToMany(() => PartesAlmacen, parteAlmacen => parteAlmacen.parte)
    partes_almacen: PartesAlmacen[];

    @ManyToOne(() => UnidadMedida, unidad => unidad.maestro_partes)
    @JoinColumn({ name: 'id_unidad' })
    unidad_medida: UnidadMedida;

    @ManyToOne(() => Categoria, categoria => categoria.maestro_partes)
    @JoinColumn({ name: 'id_categoria' })
    categoria: Categoria;

  
}

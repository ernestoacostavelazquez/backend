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
    descripcion_parte: string;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    costo_promedio: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    costo_planta: number;
  
    @Column({ type: 'decimal', precision: 15, scale: 2 })
    precio_publico: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    precio_garantia: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    precio_mayorista: number;
  
    @Column({ type: 'decimal', default: 15, scale: 3 })
    existencia: number;
  
    @Column({ type: 'decimal', default: 15, scale: 3 })
    stock_minimo: number;

    @Column({ type: 'decimal', default: 15, scale: 3 })
    stock_maximo: number;

    @Column({ type: 'decimal', default: 15, scale: 3 })
    backorder: number;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    numero_parte_fabricante: string;
  
    // Cambiar el tipo a 'TIMESTAMP' o 'DATETIME'
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_alta: Date;
    
    @Column({ type: 'varchar', length: 50, nullable: true })
    garantia_parte: string;

    @Column({ type: 'enum', enum: ['Nacional', 'Importada'] })
    tipo_origen: string;

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
    @OneToMany(() => PartesAlmacen, parteAlmacen => parteAlmacen.parte)
    partes_almacen: PartesAlmacen[];

    @ManyToOne(() => UnidadMedida, unidad => unidad.maestro_partes)
    @JoinColumn({ name: 'id_unidad' })
    unidad_medida: UnidadMedida;

    @ManyToOne(() => Categoria, categoria => categoria.maestro_partes)
    @JoinColumn({ name: 'id_categoria' })
    categoria: Categoria;

  
}

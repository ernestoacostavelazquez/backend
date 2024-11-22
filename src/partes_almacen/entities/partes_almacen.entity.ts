import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MaestroParte } from 'src/maestro_partes/entities/maestro_parte.entity';
import { Almacen } from 'src/almacenes/entities/almacene.entity';

@Entity('partes_almacen')
export class PartesAlmacen {
    @PrimaryGeneratedColumn()
    id_parte_almacen: number;

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

    @ManyToOne(() => MaestroParte, parte => parte.partes_almacen)
    @JoinColumn({ name: 'id_parte' })
    parte: MaestroParte;

    @ManyToOne(() => Almacen, almacen => almacen.partes_almacen)
    @JoinColumn({ name: 'id_almacen' })
    almacen: Almacen; 

}

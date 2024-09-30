import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';

@Entity('partes_almacen')
export class PartesAlmacen {
    @PrimaryGeneratedColumn()
    id_parte_almacen: number;
  
    @Column({ type: 'int', default: 0 })
    stock_actual: number;
  
    @Column({ type: 'int', default: 0 })
    stock_minimo: number;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fecha_actualizacion: Date;

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


}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('detalles_poliza')
export class DetallesPoliza {
    @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column({ type: 'char', length: 4 })
  codigo_cuenta: string;

  @Column({ type: 'varchar', length: 100 })
  nombre_cuenta: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monto_debito: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monto_credito: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

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

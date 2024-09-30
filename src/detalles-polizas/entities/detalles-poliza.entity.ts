import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PolizasContable } from 'src/polizas-contables/entities/polizas-contable.entity';
import { CuentasContable } from 'src/cuentas-contables/entities/cuentas-contable.entity';

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

  // Relación muchos a uno con PolizasContable
  @ManyToOne(() => PolizasContable, (poliza_contable) => poliza_contable.detalles)
  @JoinColumn({ name: 'id_poliza' })
  poliza_contable: PolizasContable;

  // Relación muchos a uno con CuentasContable
  @ManyToOne(() => CuentasContable, (cuenta_contable) => cuenta_contable.detalles)
  @JoinColumn({ name: 'id_cuenta' }) // Usa id_cuenta para la relación
  cuenta_contable: CuentasContable;

}

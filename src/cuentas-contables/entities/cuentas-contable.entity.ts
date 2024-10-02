import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DetallesPoliza } from 'src/detalles-polizas/entities/detalles-poliza.entity';
import { SaldosPeriodo } from 'src/saldos-periodos/entities/saldos-periodo.entity';
import { SubdivisionCuentasContable } from 'src/subdivision-cuentas-contables/entities/subdivision-cuentas-contable.entity';

@Entity('cuentas_contables')
export class CuentasContable {
  @PrimaryGeneratedColumn()
  id_cuenta: number;

  @Column({ type: 'char', length: 25 })
  codigo_cuenta: string;

  @Column({ type: 'varchar', length: 100 })
  nombre_cuenta: string;

  @Column({ type: 'enum', enum: ['Deudora', 'Acreedora'] })
  naturaleza: string;

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

   // Relaciones
  @OneToMany(() => DetallesPoliza, (detallesPoliza) => detallesPoliza.cuenta_contable)
  detalles: DetallesPoliza[];

  @OneToMany(() => SaldosPeriodo, (saldosPeriodo) => saldosPeriodo.cuenta_contable)
  saldos: SaldosPeriodo[];

  @ManyToOne(() => SubdivisionCuentasContable, (subdivision) => subdivision.cuentas)
  subdivision: SubdivisionCuentasContable;

 
}

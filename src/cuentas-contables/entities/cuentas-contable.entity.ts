import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DetallesPoliza } from 'src/detalles-polizas/entities/detalles-poliza.entity';
import { SaldosPeriodo } from 'src/saldos-periodos/entities/saldos-periodo.entity';
import { GruposGenerosCuenta } from 'src/grupos_generos_cuentas/entities/grupos_generos_cuenta.entity';

@Entity('cuentas_contables')
export class CuentasContable {
  @PrimaryGeneratedColumn()
  id_cuenta: number;

  @Column({ type: 'char', length: 25 })
  codigo_cuenta: string;

  @Column({ type: 'varchar', length: 100 })
  nombre_cuenta: string;

  @Column({ type: 'enum', enum: ['Deudora', 'Acreedora', 'No Aplica'] })
  naturaleza: string;

  @Column({ type: 'enum', enum: ['Titulo','Mayor', 'Auxiliar'] })
  tipo: string;

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

  @Column({ type: 'boolean'})
  estatus: boolean;

   // Relaciones
  @OneToMany(() => DetallesPoliza, (detallesPoliza) => detallesPoliza.cuenta_contable)
  detalles: DetallesPoliza[];

  @OneToMany(() => SaldosPeriodo, (saldosPeriodo) => saldosPeriodo.cuenta_contable)
  saldos: SaldosPeriodo[];

  // Relación ManyToOne con GruposGenerosCuenta (cada cuenta contable pertenece a un grupo de género)
  @ManyToOne(() => GruposGenerosCuenta, grupo => grupo.cuentas)
  @JoinColumn({ name: 'id_grupo_genero' })  // Clave foránea que conecta con GruposGenerosCuenta
  grupoGenero: GruposGenerosCuenta;
}

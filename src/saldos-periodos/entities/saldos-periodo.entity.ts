import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PeriodosContable } from 'src/periodos-contables/entities/periodos-contable.entity';
import { CuentasContable } from 'src/cuentas-contables/entities/cuentas-contable.entity';

@Entity('saldos_periodo')
export class SaldosPeriodo {
    @PrimaryGeneratedColumn()
    id_saldo: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    saldo_inicial: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    cargos: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    abonos: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    saldo_final: number;

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

     // Relación muchos a uno con PeriodosContable
     @ManyToOne(() => PeriodosContable, (periodosContable) => periodosContable.saldos)
     @JoinColumn({ name: 'id_periodo' })
     periodo_contable: PeriodosContable;

     // Relación muchos a uno con CuentasContable
    @ManyToOne(() => CuentasContable, (cuenta_contable) => cuenta_contable.saldos)
    @JoinColumn({ name: 'id_cuenta' })  // Usa id_cuenta para la relación
    cuenta_contable: CuentasContable;

}

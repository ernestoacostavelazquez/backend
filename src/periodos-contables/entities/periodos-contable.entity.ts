//periodos-contable.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { SaldosPeriodo } from 'src/saldos-periodos/entities/saldos-periodo.entity';
import { FoliosPolizasPeriodo } from 'src/folios-polizas-periodo/entities/folios-polizas-periodo.entity';

@Entity('periodos_contables')
export class PeriodosContable {
    @PrimaryGeneratedColumn()
    id_periodo: number;

    @Column({ type: 'varchar', length: 6})
    periodo: string;

    @Column({ type: 'date' })
    fecha_inicio: Date;

    @Column({ type: 'date' })
    fecha_fin: Date;

    @Column({ type: 'enum', enum: ['Abierto', 'Cerrado']})
    estado: string;

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

    // Relaciones
    @OneToMany(() => SaldosPeriodo, (saldos) => saldos.periodo_contable)
    saldos: SaldosPeriodo[];

    @OneToMany(() => FoliosPolizasPeriodo, (folios) => folios.periodo_contable)
    folios: FoliosPolizasPeriodo[];

}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TiposPoliza } from 'src/tipos-poliza/entities/tipos-poliza.entity';
import { PeriodosContable } from 'src/periodos-contables/entities/periodos-contable.entity';

@Entity('folios_polizas_periodo')
export class FoliosPolizasPeriodo {
    @PrimaryGeneratedColumn()
    id_folio_poliza_periodo: number;
  
    @Column({ type: 'int', nullable: false })
    ultimo_folio: number;

    // Relación muchos a uno con TiposPoliza
    @ManyToOne(() => TiposPoliza, (tiposPoliza) => tiposPoliza.folios)
    @JoinColumn({ name: 'id_tipo_poliza' }) // Clave foránea
    tipo_poliza: TiposPoliza;

    // Relación muchos a uno con PeriodosContable
    @ManyToOne(() => PeriodosContable, (periodoContable) => periodoContable.folios)
    @JoinColumn({ name: 'id_periodo' }) // Clave foránea
    periodo_contable: PeriodosContable;
}

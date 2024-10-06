import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TiposPoliza } from 'src/tipos-poliza/entities/tipos-poliza.entity';
import { PeriodosContable } from 'src/periodos-contables/entities/periodos-contable.entity';

@Entity('folios_polizas_periodo')
export class FoliosPolizasPeriodo {
    @PrimaryGeneratedColumn()
    id_folio_poliza_periodo: number;
  
    @Column({ type: 'int', nullable: false })
    ultimo_folio: number;

    @Column({ type: 'boolean', default: true })
    estatus: boolean;

    // Relaciones
    @ManyToOne(() => TiposPoliza, (tipoPoliza) => tipoPoliza.folios)
    @JoinColumn({ name: 'id_tipo_poliza' })  // Clave foránea
    tipo_poliza: TiposPoliza;
 
    @ManyToOne(() => PeriodosContable, (periodo) => periodo.folios)
    @JoinColumn({ name: 'id_periodo' })  // Clave foránea
    periodo_contable: PeriodosContable;

    
}

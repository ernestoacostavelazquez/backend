import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TiposPoliza } from 'src/tipos-poliza/entities/tipos-poliza.entity';
import { PeriodosContable } from 'src/periodos-contables/entities/periodos-contable.entity';

@Entity('folios_polizas_periodo')
export class FoliosPolizasPeriodo {
    @PrimaryGeneratedColumn()
    id_folio_poliza_periodo: number;
  
    @Column({ type: 'int', nullable: false })
    ultimo_folio: number;

     // Relaciones
     @ManyToOne(() => TiposPoliza, (tipoPoliza) => tipoPoliza.folios)
     tipo_poliza: TiposPoliza;
 
     @ManyToOne(() => PeriodosContable, (periodo) => periodo.folios)
     periodo_contable: PeriodosContable;

    
}

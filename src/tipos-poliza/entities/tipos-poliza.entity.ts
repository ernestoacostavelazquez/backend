// tipos-poliza.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { PolizasContable } from 'src/polizas-contables/entities/polizas-contable.entity';
import { FoliosPolizasPeriodo } from 'src/folios-polizas-periodo/entities/folios-polizas-periodo.entity';

@Entity('tipos_poliza')
export class TiposPoliza {
  @PrimaryGeneratedColumn()
  id_tipo_poliza: number;

  @Column({ type: 'varchar', length: 50})
  nombre_tipo_poliza: string;

  @Column({ type: 'varchar', length: 5})
  abreviatura: string;

  @Column({ type: 'text', nullable: true})
  descripcion: string;

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
  @OneToMany(() => PolizasContable, polizaContable => polizaContable.tipo_poliza)
  polizas: PolizasContable[];

  @OneToMany(() => FoliosPolizasPeriodo, folio => folio.tipo_poliza)
  folios: FoliosPolizasPeriodo[];

  
}

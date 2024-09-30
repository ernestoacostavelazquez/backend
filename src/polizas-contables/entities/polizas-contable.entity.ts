import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DetallesPoliza } from 'src/detalles-polizas/entities/detalles-poliza.entity';
import { TiposPoliza } from 'src/tipos-poliza/entities/tipos-poliza.entity';

@Entity('polizas_contables')
export class PolizasContable {
  @PrimaryGeneratedColumn()
  id_poliza: number;

  @Column({ type: 'varchar', length: 20 })
  numero_poliza: string;

  @Column({ type: 'date' })
  fecha_poliza: Date;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'enum', enum: ['Pendiente', 'Aprobada', 'Cancelada'] })
  estado: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  referencia_documento: string;
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

  @OneToMany(() => DetallesPoliza, (detallesPoliza) => detallesPoliza.poliza_contable)
  detalles: DetallesPoliza[];

  // Relación muchos a uno con TiposPoliza
  @ManyToOne(() => TiposPoliza, (tipo_poliza) => tipo_poliza.polizas)
  @JoinColumn({ name: 'id_tipo_poliza' })  // Especificar la clave foránea
  tipo_poliza: TiposPoliza;
}

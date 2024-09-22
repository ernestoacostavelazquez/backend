import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

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
}

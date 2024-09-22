import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('cuentas_contables')
export class CuentasContable {
  @PrimaryGeneratedColumn()
  id_cuenta: number;

  @Column({ type: 'char', length: 4 })
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
}

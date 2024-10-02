import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { MaestroParte } from 'src/maestro_partes/entities/maestro_parte.entity';

@Entity('unidad_medida')
export class UnidadMedida {
  @PrimaryGeneratedColumn()
  id_unidad: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

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

  @OneToMany(() => MaestroParte, parte => parte.unidad_medida)
  maestro_partes: MaestroParte[];


}

import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {TiposCuentasContables} from 'src/tipos-cuentas-contables/entities/tipos-cuentas-contable.entity'

@Entity()
export class SubdivisionCuentasContable {

  @PrimaryGeneratedColumn()
  id_subdivision: number;

  @Column({type:'int'})
  codigoSubdivision: number;

  @Column({type:'varchar',length:100})
  nombre_subdivision: string;

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

  
  @ManyToOne(() => TiposCuentasContables, tiposcuentascontables => tiposcuentascontables.subdivisioncuentascontable)
  @JoinColumn({ name: 'IdTipoCuenta' })
  IdTipoCuenta:TiposCuentasContables
  
}

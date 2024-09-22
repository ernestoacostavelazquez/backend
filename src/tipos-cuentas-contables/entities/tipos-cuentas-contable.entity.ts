import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {SubdivisionCuentasContable} from 'src/subdivision-cuentas-contables/entities/subdivision-cuentas-contable.entity'


@Entity()
export class TiposCuentasContables {
  @PrimaryGeneratedColumn()
  id_tipo_cuenta: number;

  @Column({type:'int'})
  codigo_tipo: number;

  @Column({type:'varchar',length:100})
  nombre_tipo: string;

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

  @OneToMany(() =>  SubdivisionCuentasContable, subdivisioncuentascontable => subdivisioncuentascontable.IdTipoCuenta)
  subdivisioncuentascontable: SubdivisionCuentasContable[]
  

}
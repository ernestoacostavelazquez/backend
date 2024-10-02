import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {TiposCuentasContables} from 'src/tipos-cuentas-contables/entities/tipos-cuentas-contable.entity'
import { CuentasContable } from 'src/cuentas-contables/entities/cuentas-contable.entity';

@Entity()
export class SubdivisionCuentasContable {

  @PrimaryGeneratedColumn()
  id_subdivision: number;

  @Column({type:'int'})
  codigo_subdivision: number;

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

   // Relaciones
   @OneToMany(() => CuentasContable, (cuentas) => cuentas.subdivision)
   cuentas: CuentasContable[];
 
   @ManyToOne(() => TiposCuentasContables, (tipoCuenta) => tipoCuenta.subdivisiones)
   @JoinColumn({ name: 'id_tipo_cuenta' })
   tipo_cuenta: TiposCuentasContables;

}

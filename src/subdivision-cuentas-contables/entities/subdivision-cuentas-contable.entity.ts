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

  
  @ManyToOne(() => TiposCuentasContables, tiposcuentascontables => tiposcuentascontables.id_subdivision)
  @JoinColumn({ name: 'id_tipo_cuenta' })
  id_tipo_cuenta:TiposCuentasContables

  // Relación uno a muchos con CuentasContable
  @OneToMany(() => CuentasContable, (cuenta) => cuenta.subdivision)
  @JoinColumn({ name: 'id_cuenta' })
  id_cuenta: CuentasContable[];
  

  

}

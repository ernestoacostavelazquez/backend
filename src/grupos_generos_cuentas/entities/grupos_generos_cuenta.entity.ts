import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { GenerosCuentasContable } from 'src/generos_cuentas_contables/entities/generos_cuentas_contable.entity';
import { CuentasContable } from 'src/cuentas-contables/entities/cuentas-contable.entity';

@Entity('grupos_generos_cuentas')
export class GruposGenerosCuenta {

    @PrimaryGeneratedColumn()
    id_grupo_genero: number;
  
    @Column({ type: 'varchar', length: 100 })
    nombre_grupo: string;

    @Column({ type: 'int' })
    codigo_grupo: number;

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

  
    @Column({ type: 'boolean', default: true })
    estatus: boolean;

     // Relación ManyToOne con GenerosCuentasContable
    @ManyToOne(() => GenerosCuentasContable, genero => genero.gruposGeneros)
    @JoinColumn({ name: 'id_genero_cuenta' })  // Clave foránea
    genero: GenerosCuentasContable;

    // Relación OneToMany con CuentasContable (un grupo de géneros puede tener muchas cuentas contables)
    @OneToMany(() => CuentasContable, cuenta => cuenta.grupoGenero)
    cuentas: CuentasContable[];  // Relación uno a muchos con CuentasContable
   
}

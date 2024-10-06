import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { GruposGenerosCuenta } from 'src/grupos_generos_cuentas/entities/grupos_generos_cuenta.entity';

@Entity('generos_cuentas_contables')
export class GenerosCuentasContable {

    @PrimaryGeneratedColumn()
    id_genero_cuenta: number;

    @Column({ type: 'varchar', length: 100 })
    nombre_genero: string;

    @Column({ type: 'int' })
    codigo_genero: number;

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

     // Relación OneToMany con GruposGenerosCuenta
     @OneToMany(() => GruposGenerosCuenta, grupo => grupo.genero)
     gruposGeneros: GruposGenerosCuenta[];
    
}

import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { PartesAlmacen } from 'src/partes_almacen/entities/partes_almacen.entity';
import { UbicacionesAlmacen } from 'src/ubicaciones_almacen/entities/ubicaciones_almacen.entity';

@Entity('almacenes')
export class Almacen {
    @PrimaryGeneratedColumn()
    id_almacen: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    direccion: string;

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

    @Column({ type: 'boolean', default: true })
    estatus: boolean;

    @OneToMany(() => PartesAlmacen, parteAlmacen => parteAlmacen.almacen)
    partes_almacen: PartesAlmacen[];

    @OneToMany(() => UbicacionesAlmacen, ubicacion => ubicacion.almacen)
    ubicaciones_almacen: UbicacionesAlmacen[];

}

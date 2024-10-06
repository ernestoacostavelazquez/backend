import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Almacen } from 'src/almacenes/entities/almacene.entity';

@Entity('ubicaciones_almacen')
export class UbicacionesAlmacen {
    @PrimaryGeneratedColumn()
    id_ubicacion: number;

    @Column({ type: 'varchar', length: 100 })
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

    @Column({ type: 'boolean', default: true })
    estatus: boolean;

    @ManyToOne(() => Almacen, almacen => almacen.ubicaciones_almacen)
    @JoinColumn({ name: 'id_almacen' })
    almacen: Almacen;


}

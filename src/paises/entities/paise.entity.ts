// pais.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('paises')
export class Pais {
    @PrimaryGeneratedColumn({ name: 'id_pais' })
    id_pais: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'char', length: 2, unique: true })
    codigo_iso_alpha2: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: true})
    created_by: string;

    @Column({ nullable: true})
    updated_by: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ type: 'boolean', default: true })
    estatus: boolean;
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('codigos_postales')
export class CodigosPostal {
    @PrimaryGeneratedColumn()
    id_codigo_postal: number;
  
    @Column({ type: 'varchar', length: 10 })
    codigo: string;
  
    @Column({ type: 'varchar', length: 100 })
    localidad: string;
  
    @Column({ type: 'varchar', length: 100 })
    municipio: string;
  
    @Column({ type: 'varchar', length: 100 })
    estado: string;

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

}

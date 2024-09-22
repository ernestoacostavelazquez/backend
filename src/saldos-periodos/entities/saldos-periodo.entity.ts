import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('saldos_periodo')
export class SaldosPeriodo {
    @PrimaryGeneratedColumn()
    id_saldo: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    saldo_inicial: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    cargos: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    abonos: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    saldo_final: number;

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

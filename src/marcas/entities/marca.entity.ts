// marca.entity.ts
import { Armadora } from 'src/armadoras/entities/armadora.entity';
import { Modelo } from 'src/modelos/entities/modelo.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity('marcas')
  export class Marca {
    @PrimaryGeneratedColumn()
    id_marca: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_marca: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion_marca: string;

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

       // Relación ManyToOne con Armadora
    @ManyToOne(() => Armadora, armadora => armadora.marca)
    @JoinColumn({ name: 'id_armadora' })  // Clave foránea
    armadora: Armadora;
  
    // Relación OneToMany con Modelos
    @OneToMany(() => Modelo, modelo => modelo.marca)
    modelo: Modelo[];
     
  }
  
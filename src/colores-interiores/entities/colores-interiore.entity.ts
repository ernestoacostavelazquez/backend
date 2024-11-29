// colores-interiore.entity.ts
import { Colore } from 'src/colores/entities/colore.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('colores_interiores')
  export class ColoresInteriore {
    @PrimaryGeneratedColumn()
    id_color_interior: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_color_interior: string;
  
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
    
    @ManyToOne(() => Colore, (colore) => colore.colores_interiores, { nullable: false })
    @JoinColumn({ name: 'id_color' })
    colore: Colore;
   

  }
  
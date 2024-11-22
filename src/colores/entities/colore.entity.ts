//colore.entity.ts
import { ColoresExteriore } from 'src/colores-exteriores/entities/colores-exteriore.entity';
import { ColoresInteriore } from 'src/colores-interiores/entities/colores-interiore.entity';
import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn, OneToMany} from 'typeorm';
  
  @Entity('colores')
  export class Colore {
    @PrimaryGeneratedColumn()
    id_color: number;
  
    @Column({ type: 'varchar', length: 50 })
    nombre_color: string;

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

    // Relación OneToMany con Colores Exteriores
    @OneToMany(() => ColoresExteriore, coloresExteriore => coloresExteriore.colore)
    coloresExteriore: ColoresExteriore[];

    // Relación OneToMany con Colores Interiores
    @OneToMany(() => ColoresInteriore, coloresInteriore => coloresInteriore.colore)
    coloresInteriore: ColoresInteriore[];
  }
  
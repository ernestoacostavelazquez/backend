import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlmaceneDto } from './dto/create-almacene.dto';
import { UpdateAlmaceneDto } from './dto/update-almacene.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Almacen } from './entities/almacene.entity';

@Injectable()
export class AlmacenesService {
  
  constructor(
    @InjectRepository(Almacen)
    private almacenesRepository: Repository<Almacen>,
  ) {}

  async create(createAlmacenDto: CreateAlmaceneDto): Promise<Almacen> {
    const nuevoAlmacen = this.almacenesRepository.create(createAlmacenDto);
    return await this.almacenesRepository.save(nuevoAlmacen);
  }

  async findAll(): Promise<Almacen[]> {
    return await this.almacenesRepository.find();
  }

  async findOne(id: number): Promise<Almacen> {
    // Validar que el ID existe
    const almacen = await this.almacenesRepository.findOneBy({ id_almacen: id });
    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
    }
    return almacen;
  }

  async update(id: number, updateAlmacenDto: UpdateAlmaceneDto): Promise<void> {
    // Validar que el ID existe
    const almacen = await this.almacenesRepository.findOneBy({ id_almacen: id });
    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
    }
    
    await this.almacenesRepository.update(id, updateAlmacenDto);
  }

  async remove(id: number): Promise<void> {
    // Validar que el ID existe
    const almacen = await this.almacenesRepository.findOneBy({ id_almacen: id });
    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
    }

    await this.almacenesRepository.softDelete(id);
  }
}

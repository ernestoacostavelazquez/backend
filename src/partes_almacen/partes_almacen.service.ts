import { Injectable } from '@nestjs/common';
import { CreatePartesAlmacenDto } from './dto/create-partes_almacen.dto';
import { UpdatePartesAlmacenDto } from './dto/update-partes_almacen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartesAlmacen } from './entities/partes_almacen.entity';

@Injectable()
export class PartesAlmacenService {

  constructor(
    @InjectRepository(PartesAlmacen)
    private partesAlmacenRepository: Repository<PartesAlmacen>,
  ) {}

  async create(createParteAlmacenDto: CreatePartesAlmacenDto): Promise<PartesAlmacen> {
    const parteAlmacen = this.partesAlmacenRepository.create(createParteAlmacenDto);
    return this.partesAlmacenRepository.save(parteAlmacen);
  }

  async findAll(): Promise<PartesAlmacen[]> {
    return this.partesAlmacenRepository.find();
  }

  async findOne(id: number): Promise<PartesAlmacen> {
    return this.partesAlmacenRepository.findOneBy({ id_parte_almacen: id });
  }

  async update(id: number, updateParteAlmacenDto: UpdatePartesAlmacenDto): Promise<void> {
    await this.partesAlmacenRepository.update(id, updateParteAlmacenDto);
  }

  async remove(id: number): Promise<void> {
    await this.partesAlmacenRepository.delete(id);
  }
  
}

import { Injectable } from '@nestjs/common';
import { CreateUbicacionesAlmacenDto } from './dto/create-ubicaciones_almacen.dto';
import { UpdateUbicacionesAlmacenDto } from './dto/update-ubicaciones_almacen.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UbicacionesAlmacen } from './entities/ubicaciones_almacen.entity';

@Injectable()
export class UbicacionesAlmacenService {
  constructor(
    @InjectRepository(UbicacionesAlmacen)
    private readonly ubicacionAlmacenRepository: Repository<UbicacionesAlmacen>,
  ) {}

  async create(createUbicacionAlmacenDto: CreateUbicacionesAlmacenDto): Promise<UbicacionesAlmacen> {
    const nuevaUbicacion = this.ubicacionAlmacenRepository.create(createUbicacionAlmacenDto);
    return this.ubicacionAlmacenRepository.save(nuevaUbicacion);
  }

  async findAll(): Promise<UbicacionesAlmacen[]> {
    return this.ubicacionAlmacenRepository.find();
  }

  async findOne(id: number): Promise<UbicacionesAlmacen> {
    return this.ubicacionAlmacenRepository.findOne({ where: { id_ubicacion: id } });
  }

  async update(id: number, updateUbicacionAlmacenDto: UpdateUbicacionesAlmacenDto): Promise<void> {
    await this.ubicacionAlmacenRepository.update(id, updateUbicacionAlmacenDto);
  }

  async remove(id: number): Promise<void> {
    await this.ubicacionAlmacenRepository.delete(id);
  }

 
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUbicacionesAlmacenDto } from './dto/create-ubicaciones_almacen.dto';
import { UpdateUbicacionesAlmacenDto } from './dto/update-ubicaciones_almacen.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UbicacionesAlmacen } from './entities/ubicaciones_almacen.entity';
import { Almacen } from 'src/almacenes/entities/almacene.entity';

@Injectable()
export class UbicacionesAlmacenService {
  constructor(
    @InjectRepository(UbicacionesAlmacen)
    private readonly ubicacionAlmacenRepository: Repository<UbicacionesAlmacen>,

    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,
  ) {}

  // Función para crear una nueva ubicación de almacén
  async create(createUbicacionAlmacenDto: CreateUbicacionesAlmacenDto): Promise<UbicacionesAlmacen> {
    const { id_almacen, ...rest } = createUbicacionAlmacenDto;

    // Verificar si el almacén existe
    const almacen = await this.almacenRepository.findOne({
      where: { id_almacen },
    });

    if (!almacen) {
      throw new HttpException('Almacén no encontrado', HttpStatus.NOT_FOUND);
    }

    // Crear la nueva ubicación y asociarla con el almacén
    const nuevaUbicacion = this.ubicacionAlmacenRepository.create({
      ...rest,
      almacen: almacen, // Relación con almacén
    });

    return this.ubicacionAlmacenRepository.save(nuevaUbicacion);
  }

  // Función para obtener todas las ubicaciones
  async findAll(): Promise<UbicacionesAlmacen[]> {
    return this.ubicacionAlmacenRepository.find({
      relations: ['almacen'], // Incluir la relación con almacén
    });
  }

  // Función para obtener una ubicación específica
  async findOne(id: number): Promise<UbicacionesAlmacen> {
    const ubicacion = await this.ubicacionAlmacenRepository.findOne({
      where: { id_ubicacion: id },
      relations: ['almacen'], // Incluir la relación con almacén
    });

    if (!ubicacion) {
      throw new HttpException('Ubicación no encontrada', HttpStatus.NOT_FOUND);
    }

    return ubicacion;
  }

  // Función para actualizar una ubicación existente
  async update(id: number, updateUbicacionAlmacenDto: UpdateUbicacionesAlmacenDto): Promise<void> {
    const { id_almacen, ...rest } = updateUbicacionAlmacenDto;

    // Buscar la ubicación existente
    const ubicacion = await this.ubicacionAlmacenRepository.findOne({
      where: { id_ubicacion: id },
      relations: ['almacen'],
    });

    if (!ubicacion) {
      throw new HttpException('Ubicación no encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar si se necesita actualizar el almacén
    if (id_almacen) {
      const almacen = await this.almacenRepository.findOne({
        where: { id_almacen },
      });

      if (!almacen) {
        throw new HttpException('Almacén no encontrado', HttpStatus.NOT_FOUND);
      }

      ubicacion.almacen = almacen; // Actualizar la relación con almacén
    }

    Object.assign(ubicacion, rest);
    await this.ubicacionAlmacenRepository.save(ubicacion);
  }

  // Función para eliminar una ubicación
  async remove(id: number): Promise<void> {
    const ubicacion = await this.ubicacionAlmacenRepository.findOne({
      where: { id_ubicacion: id },
    });

    if (!ubicacion) {
      throw new HttpException('Ubicación no encontrada', HttpStatus.NOT_FOUND);
    }

    await this.ubicacionAlmacenRepository.softDelete(id);
  }
 
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCodigosPostaleDto } from './dto/create-codigos_postale.dto';
import { UpdateCodigosPostaleDto } from './dto/update-codigos_postale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodigosPostal } from './entities/codigos_postale.entity';

@Injectable()
export class CodigosPostalesService {
 
  constructor(
    @InjectRepository(CodigosPostal)
    private readonly codigosPostalesRepository: Repository<CodigosPostal>,
  ) {}

  // Crear un nuevo código postal
  async create(createCodigoPostalDto: CreateCodigosPostaleDto): Promise<CodigosPostal> {
    const nuevoCodigoPostal = this.codigosPostalesRepository.create(createCodigoPostalDto);
    return this.codigosPostalesRepository.save(nuevoCodigoPostal);
  }

  // Obtener todos los códigos postales
  async findAll(): Promise<CodigosPostal[]> {
    return this.codigosPostalesRepository.find();
  }

  // Buscar un código postal por ID
  async findOne(id: number): Promise<CodigosPostal> {
    const codigoPostal = await this.codigosPostalesRepository.findOne({ where: { id_codigo_postal: id } });
    if (!codigoPostal) {
      throw new NotFoundException(`Código postal con ID ${id} no encontrado`);
    }
    return codigoPostal;
  }

  // Actualizar un código postal por ID
  async update(id: number, updateCodigoPostalDto: UpdateCodigosPostaleDto): Promise<void> {
    const result = await this.codigosPostalesRepository.update(id, updateCodigoPostalDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Código postal con ID ${id} no encontrado`);
    }
  }

  // Eliminar un código postal por ID
  async remove(id: number): Promise<void> {
    const result = await this.codigosPostalesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Código postal con ID ${id} no encontrado`);
    }
  }
}

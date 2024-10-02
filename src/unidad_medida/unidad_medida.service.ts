import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadMedidaDto } from './dto/create-unidad_medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad_medida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadMedida } from './entities/unidad_medida.entity';

@Injectable()
export class UnidadMedidaService {

  constructor(
    @InjectRepository(UnidadMedida)
    private unidadMedidaRepository: Repository<UnidadMedida>,
  ) {}

  async create(createUnidadMedidaDto: CreateUnidadMedidaDto): Promise<UnidadMedida> {
    const unidadMedida = this.unidadMedidaRepository.create(createUnidadMedidaDto);
    return this.unidadMedidaRepository.save(unidadMedida);
  }

  async findAll(): Promise<UnidadMedida[]> {
    return this.unidadMedidaRepository.find();
  }

  async findOne(id: number): Promise<UnidadMedida> {
    // Verificar si la unidad de medida existe
    const unidadMedida = await this.unidadMedidaRepository.findOne({ where: { id_unidad: id } });
    if (!unidadMedida) {
      throw new NotFoundException(`Unidad de medida con ID ${id} no encontrada`);
    }
    return unidadMedida;
  }

  async update(id: number, updateUnidadMedidaDto: UpdateUnidadMedidaDto): Promise<void> {
    // Verificar si la unidad de medida existe antes de actualizar
    const unidadMedida = await this.unidadMedidaRepository.findOne({ where: { id_unidad: id } });
    if (!unidadMedida) {
      throw new NotFoundException(`Unidad de medida con ID ${id} no encontrada`);
    }

    await this.unidadMedidaRepository.update(id, updateUnidadMedidaDto);
  }

  async remove(id: number): Promise<void> {
    // Verificar si la unidad de medida existe antes de eliminar
    const unidadMedida = await this.unidadMedidaRepository.findOne({ where: { id_unidad: id } });
    if (!unidadMedida) {
      throw new NotFoundException(`Unidad de medida con ID ${id} no encontrada`);
    }

    await this.unidadMedidaRepository.softDelete(id);
  }
}

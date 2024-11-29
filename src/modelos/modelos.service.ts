// modelo.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { Modelo } from './entities/modelo.entity';
import { Familia } from 'src/familias/entities/familia.entity';

@Injectable()
export class ModelosService {
  constructor(
    @InjectRepository(Modelo)
    private readonly modelosRepository: Repository<Modelo>,

    @InjectRepository(Familia)
    private readonly familiasRepository: Repository<Familia>,
  ) {}

  async create(createModeloDto: CreateModeloDto): Promise<{ message: string; result: boolean; data: Modelo | null }> {
    const familia = await this.familiasRepository.findOne({ where: { id_familia: createModeloDto.id_familia } });

    if (!familia) {
      return {
        message: 'Familia no encontrada',
        result: false,
        data: null,
      };
    }

    const newModelo = this.modelosRepository.create({ ...createModeloDto, familia });
    const savedModelo = await this.modelosRepository.save(newModelo);

    return {
      message: 'Modelo creado con éxito',
      result: true,
      data: savedModelo,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: Modelo[] }> {
    const modelos = await this.modelosRepository.find({ relations: ['familia'] });
    return {
      message: 'Listado de modelos recuperado con éxito',
      result: true,
      data: modelos,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: Modelo | null }> {
    const modelo = await this.modelosRepository.findOne({ where: { id_modelo: id }, relations: ['familia'] });

    if (!modelo) {
      return {
        message: `Modelo con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Modelo con ID ${id} recuperado con éxito`,
      result: true,
      data: modelo,
    };
  }

  async update(id: number, updateModeloDto: UpdateModeloDto): Promise<{ message: string; result: boolean; data: Modelo | null }> {
    const modelo = await this.modelosRepository.findOne({ where: { id_modelo: id } });

    if (!modelo) {
      return {
        message: `Modelo con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    if (updateModeloDto.id_familia) {
      const familia = await this.familiasRepository.findOne({ where: { id_familia: updateModeloDto.id_familia } });

      if (!familia) {
        return {
          message: 'Familia no encontrada',
          result: false,
          data: null,
        };
      }

      modelo.familia = familia;
    }

    Object.assign(modelo, updateModeloDto);
    const updatedModelo = await this.modelosRepository.save(modelo);

    return {
      message: `Modelo con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedModelo,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.modelosRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: `Modelo con ID ${id} no encontrado`,
        result: false,
      };
    }

    return {
      message: `Modelo con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}

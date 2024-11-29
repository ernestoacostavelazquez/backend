// versiones.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVersioneDto } from './dto/create-versione.dto';
import { UpdateVersioneDto } from './dto/update-versione.dto';
import { Versione } from './entities/versione.entity';
import { Modelo } from 'src/modelos/entities/modelo.entity';

@Injectable()
export class VersionesService {
  constructor(
    @InjectRepository(Versione)
    private readonly versionesRepository: Repository<Versione>,

    @InjectRepository(Modelo)
    private readonly modelosRepository: Repository<Modelo>,
  ) {}

  async create(createVersioneDto: CreateVersioneDto): Promise<{ message: string; result: boolean; data: Versione | null }> {
    const modelo = await this.modelosRepository.findOne({ where: { id_modelo: createVersioneDto.id_modelo } });

    if (!modelo) {
      return {
        message: 'Modelo no encontrado',
        result: false,
        data: null,
      };
    }

    const newVersione = this.versionesRepository.create({ ...createVersioneDto, modelo });
    const savedVersione = await this.versionesRepository.save(newVersione);

    return {
      message: 'Versión creada con éxito',
      result: true,
      data: savedVersione,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: Versione[] }> {
    const versiones = await this.versionesRepository.find({ relations: ['modelo'] });
    return {
      message: 'Listado de versiones recuperado con éxito',
      result: true,
      data: versiones,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: Versione | null }> {
    const version = await this.versionesRepository.findOne({ where: { id_version: id }, relations: ['modelo'] });

    if (!version) {
      return {
        message: `Versión con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Versión con ID ${id} recuperada con éxito`,
      result: true,
      data: version,
    };
  }

  async update(id: number, updateVersioneDto: UpdateVersioneDto): Promise<{ message: string; result: boolean; data: Versione | null }> {
    const version = await this.versionesRepository.findOne({ where: { id_version: id } });

    if (!version) {
      return {
        message: `Versión con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    if (updateVersioneDto.id_modelo) {
      const modelo = await this.modelosRepository.findOne({ where: { id_modelo: updateVersioneDto.id_modelo } });

      if (!modelo) {
        return {
          message: 'Modelo no encontrado',
          result: false,
          data: null,
        };
      }

      version.modelo = modelo;
    }

    Object.assign(version, updateVersioneDto);
    const updatedVersion = await this.versionesRepository.save(version);

    return {
      message: `Versión con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedVersion,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.versionesRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: `Versión con ID ${id} no encontrada`,
        result: false,
      };
    }

    return {
      message: `Versión con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}

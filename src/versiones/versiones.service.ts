// versiones.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Versione } from './entities/versione.entity';
import { CreateVersioneDto } from './dto/create-versione.dto';
import { UpdateVersioneDto } from './dto/update-versione.dto';

@Injectable()
export class VersionesService {
  constructor(
    @InjectRepository(Versione)
    private readonly versionesRepository: Repository<Versione>,
  ) {}

  /**
   * Crear una nueva versión
   * @param createVersioneDto
   * @returns
   */
  async create(createVersioneDto: CreateVersioneDto): Promise<{ message: string; result: boolean; data: Versione | null }> {
    const existingVersion = await this.versionesRepository.findOne({
      where: { nombre_version: createVersioneDto.nombre_version },
    });

    if (existingVersion) {
      return {
        message: 'La versión ya existe',
        result: false,
        data: null,
      };
    }

    const newVersion = this.versionesRepository.create(createVersioneDto);
    const savedVersion = await this.versionesRepository.save(newVersion);

    return {
      message: 'Versión creada con éxito',
      result: true,
      data: savedVersion,
    };
  }

  /**
   * Obtener todas las versiones
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: Versione[] }> {
    const versiones = await this.versionesRepository.find({
      order: { nombre_version: 'ASC' },
    });

    if (versiones.length === 0) {
      return {
        message: 'No se encontraron versiones',
        result: false,
        data: [],
      };
    }

    return {
      message: 'Listado de versiones recuperado con éxito',
      result: true,
      data: versiones,
    };
  }

  /**
   * Obtener una versión por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: Versione | null }> {
    const version = await this.versionesRepository.findOne({ where: { id_version: id } });

    if (!version) {
      return {
        message: 'La versión no existe',
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

  /**
   * Actualizar una versión por ID
   * @param id
   * @param updateVersioneDto
   * @returns
   */
  async update(id: number, updateVersioneDto: UpdateVersioneDto): Promise<{ message: string; result: boolean; data: Versione | null }> {
    const version = await this.versionesRepository.preload({
      id_version: id,
      ...updateVersioneDto,
    });

    if (!version) {
      return {
        message: 'La versión no existe',
        result: false,
        data: null,
      };
    }

    const updatedVersion = await this.versionesRepository.save(version);

    return {
      message: `Versión con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedVersion,
    };
  }

  /**
   * Eliminar una versión (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.versionesRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'La versión no existe',
        result: false,
      };
    }

    return {
      message: `Versión con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}

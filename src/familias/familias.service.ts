// familias.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Familia } from './entities/familia.entity';
import { CreateFamiliaDto } from './dto/create-familia.dto';
import { UpdateFamiliaDto } from './dto/update-familia.dto';

@Injectable()
export class FamiliasService {
  constructor(
    @InjectRepository(Familia)
    private readonly familiasRepository: Repository<Familia>,
  ) {}

  /**
   * Crear una nueva familia
   * @param createFamiliaDto
   * @returns
   */
  async create(createFamiliaDto: CreateFamiliaDto): Promise<{ message: string; result: boolean; data: Familia | null }> {
    const existingFamilia = await this.familiasRepository.findOne({
      where: { nombre_familia: createFamiliaDto.nombre_familia },
    });

    if (existingFamilia) {
      throw new BadRequestException({
        message: 'La familia ya existe',
        result: false,
        data: null,
      });
    }

    const newFamilia = this.familiasRepository.create(createFamiliaDto);
    const savedFamilia = await this.familiasRepository.save(newFamilia);

    return {
      message: 'Familia creada con éxito',
      result: true,
      data: savedFamilia,
    };
  }

  /**
   * Obtener todas las familias
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: Familia[] }> {
    const familias = await this.familiasRepository.find();
    return {
      message: 'Listado de familias recuperado con éxito',
      result: true,
      data: familias,
    };
  }

  /**
   * Obtener una familia por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: Familia | null }> {
    const familia = await this.familiasRepository.findOne({ where: { id_familia: id } });

    if (!familia) {
      throw new NotFoundException({
        message: 'La familia no existe',
        result: false,
        data: null,
      });
    }

    return {
      message: `Familia con ID ${id} recuperada con éxito`,
      result: true,
      data: familia,
    };
  }

  /**
   * Actualizar una familia por ID
   * @param id
   * @param updateFamiliaDto
   * @returns
   */
  async update(id: number, updateFamiliaDto: UpdateFamiliaDto): Promise<{ message: string; result: boolean; data: Familia | null }> {
    const familia = await this.familiasRepository.preload({
      id_familia: id,
      ...updateFamiliaDto,
    });

    if (!familia) {
      throw new NotFoundException({
        message: 'La familia no existe',
        result: false,
        data: null,
      });
    }

    const updatedFamilia = await this.familiasRepository.save(familia);

    return {
      message: `Familia con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedFamilia,
    };
  }

  /**
   * Eliminar una familia (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.familiasRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException({
        message: 'La familia no existe',
        result: false,
      });
    }

    return {
      message: `Familia con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}

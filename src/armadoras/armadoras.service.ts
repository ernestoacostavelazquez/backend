// armadoras.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Armadora } from './entities/armadora.entity';
import { CreateArmadoraDto } from './dto/create-armadora.dto';
import { UpdateArmadoraDto } from './dto/update-armadora.dto';

@Injectable()
export class ArmadorasService {
  constructor(
    @InjectRepository(Armadora)
    private readonly armadorasRepository: Repository<Armadora>,
  ) {}

  /**
   * Crear una nueva armadora
   * @param createArmadoraDto
   * @returns
   */
  async create(createArmadoraDto: CreateArmadoraDto): Promise<{ message: string; result: boolean; data: Armadora | null }> {
    const existingArmadora = await this.armadorasRepository.findOne({
      where: { nombre_armadora: createArmadoraDto.nombre_armadora },
    });

    if (existingArmadora) {
      return {
        message: 'La armadora ya existe',
        result: false,
        data: null,
      };
    }

    const newArmadora = this.armadorasRepository.create(createArmadoraDto);
    const savedArmadora = await this.armadorasRepository.save(newArmadora);

    return {
      message: 'Armadora creada con éxito',
      result: true,
      data: savedArmadora,
    };
  }

  /**
   * Obtener todas las armadoras
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: Armadora[] }> {
    const armadoras = await this.armadorasRepository.find({
      order: { nombre_armadora: 'ASC' },
    });

    if (armadoras.length === 0) {
      return {
        message: 'No se encontraron armadoras',
        result: false,
        data: [],
      };
    }

    return {
      message: 'Listado de armadoras recuperado con éxito',
      result: true,
      data: armadoras,
    };
  }

  /**
   * Obtener una armadora por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: Armadora | null }> {
    const armadora = await this.armadorasRepository.findOne({ where: { id_armadora: id } });

    if (!armadora) {
      return {
        message: 'La armadora no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Armadora con ID ${id} recuperada con éxito`,
      result: true,
      data: armadora,
    };
  }

  /**
   * Actualizar una armadora por ID
   * @param id
   * @param updateArmadoraDto
   * @returns
   */
  async update(id: number, updateArmadoraDto: UpdateArmadoraDto): Promise<{ message: string; result: boolean; data: Armadora | null }> {
    const armadora = await this.armadorasRepository.preload({
      id_armadora: id,
      ...updateArmadoraDto,
    });

    if (!armadora) {
      return {
        message: 'La armadora no existe',
        result: false,
        data: null,
      };
    }

    const updatedArmadora = await this.armadorasRepository.save(armadora);

    return {
      message: `Armadora con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedArmadora,
    };
  }

  /**
   * Eliminar una armadora (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.armadorasRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'La armadora no existe',
        result: false,
      };
    }

    return {
      message: `Armadora con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}

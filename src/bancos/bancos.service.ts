// bancos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banco } from './entities/banco.entity';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';

@Injectable()
export class BancosService {
  constructor(
    @InjectRepository(Banco)
    private readonly bancosRepository: Repository<Banco>,
  ) {}

  /**
   * Crear un nuevo banco
   * @param createBancoDto
   * @returns
   */
  async create(createBancoDto: CreateBancoDto): Promise<{ message: string; result: boolean; data: Banco | null }> {
    const existingBanco = await this.bancosRepository.findOne({
      where: { nombre_banco: createBancoDto.nombre_banco },
    });

    if (existingBanco) {
      return {
        message: 'El banco ya existe',
        result: false,
        data: null,
      };
    }

    const newBanco = this.bancosRepository.create(createBancoDto);
    const savedBanco = await this.bancosRepository.save(newBanco);

    return {
      message: 'Banco creado con éxito',
      result: true,
      data: savedBanco,
    };
  }

  /**
   * Obtener todos los bancos
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: Banco[] }> {
    const bancos = await this.bancosRepository.find({
      order: { nombre_banco: 'ASC' },
    });

    if (bancos.length === 0) {
      return {
        message: 'No se encontraron bancos',
        result: false,
        data: [],
      };
    }

    return {
      message: 'Listado de bancos recuperado con éxito',
      result: true,
      data: bancos,
    };
  }

  /**
   * Obtener un banco por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: Banco | null }> {
    const banco = await this.bancosRepository.findOne({ where: { id_banco: id } });

    if (!banco) {
      return {
        message: 'El banco no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Banco con ID ${id} recuperado con éxito`,
      result: true,
      data: banco,
    };
  }

  /**
   * Actualizar un banco por ID
   * @param id
   * @param updateBancoDto
   * @returns
   */
  async update(id: number, updateBancoDto: UpdateBancoDto): Promise<{ message: string; result: boolean; data: Banco | null }> {
    const banco = await this.bancosRepository.preload({
      id_banco: id,
      ...updateBancoDto,
    });

    if (!banco) {
      return {
        message: 'El banco no existe',
        result: false,
        data: null,
      };
    }

    const updatedBanco = await this.bancosRepository.save(banco);

    return {
      message: `Banco con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedBanco,
    };
  }

  /**
   * Eliminar un banco (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.bancosRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'El banco no existe',
        result: false,
      };
    }

    return {
      message: `Banco con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}

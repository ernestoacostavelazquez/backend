//canales_venta.srvice.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CanalesVenta } from './entities/canales_venta.entity';
import { CreateCanalesVentaDto } from './dto/create-canales_venta.dto';
import { UpdateCanalesVentaDto } from './dto/update-canales_venta.dto';

@Injectable()
export class CanalesVentaService {
  constructor(
    @InjectRepository(CanalesVenta)
    private readonly canalesVentaRepository: Repository<CanalesVenta>,
  ) {}

  /**
   * Crear un canal de venta
   * @param createCanalesVentaDto
   * @returns
   */
  async create(createCanalesVentaDto: CreateCanalesVentaDto): Promise<{ message: string; result: boolean; data: CanalesVenta | null }> {
    const existingCanal = await this.canalesVentaRepository.findOne({
      where: { nombre_canal: createCanalesVentaDto.nombre_canal },
    });

    if (existingCanal) {
      return {
        message: 'El canal de venta ya existe',
        result: false,
        data: null,
      };
    }

    const newCanal = this.canalesVentaRepository.create(createCanalesVentaDto);
    const savedCanal = await this.canalesVentaRepository.save(newCanal);

    return {
      message: 'Canal de venta creado con éxito',
      result: true,
      data: savedCanal,
    };
  }

  /**
   * Obtener todos los canales de venta
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: CanalesVenta[] }> {
    const canales = await this.canalesVentaRepository.find();
    return {
      message: 'Listado de canales de venta recuperado con éxito',
      result: true,
      data: canales,
    };
  }

  /**
   * Obtener un canal de venta por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: CanalesVenta | null }> {
    const canal = await this.canalesVentaRepository.findOne({ where: { id_canal_venta: id } });

    if (!canal) {
      return {
        message: 'El canal de venta no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Canal de venta con ID ${id} recuperado con éxito`,
      result: true,
      data: canal,
    };
  }

  /**
   * Actualizar un canal de venta
   * @param id
   * @param updateCanalesVentaDto
   * @returns
   */
  async update(id: number, updateCanalesVentaDto: UpdateCanalesVentaDto): Promise<{ message: string; result: boolean; data: CanalesVenta | null }> {
    const canal = await this.canalesVentaRepository.preload({
      id_canal_venta: id,
      ...updateCanalesVentaDto,
    });

    if (!canal) {
      return {
        message: 'El canal de venta no existe',
        result: false,
        data: null,
      };
    }

    const updatedCanal = await this.canalesVentaRepository.save(canal);

    return {
      message: `Canal de venta con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedCanal,
    };
  }

  /**
   * Eliminar un canal de venta (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.canalesVentaRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'El canal de venta no existe',
        result: false,
      };
    }

    return {
      message: `Canal de venta con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}

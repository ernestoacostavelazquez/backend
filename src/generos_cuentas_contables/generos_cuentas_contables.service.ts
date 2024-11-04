import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenerosCuentasContableDto } from './dto/create-generos_cuentas_contable.dto';
import { UpdateGenerosCuentasContableDto } from './dto/update-generos_cuentas_contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerosCuentasContable } from './entities/generos_cuentas_contable.entity';

@Injectable()
export class GenerosCuentasContablesService {
  
  constructor(
    @InjectRepository(GenerosCuentasContable)
    private readonly generosCuentasContablesRepository: Repository<GenerosCuentasContable>,
  ) {}

  async create(createGenerosCuentasContableDto: CreateGenerosCuentasContableDto): Promise<{ message: string; result: boolean; data: GenerosCuentasContable | null }> {
    const generoCuentaExists = await this.generosCuentasContablesRepository.findOne({
      where: { codigo_genero: createGenerosCuentasContableDto.codigo_genero },
    });

    if (generoCuentaExists) {
      return {
        message: 'El género de cuenta contable ya existe',
        result: false,
        data: null,
      };
    }

    const newGeneroCuenta = this.generosCuentasContablesRepository.create(createGenerosCuentasContableDto);
    const generoCuentaCreada = await this.generosCuentasContablesRepository.save(newGeneroCuenta);

    return {
      message: 'Género de cuenta contable creado con éxito',
      result: true,
      data: generoCuentaCreada,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: GenerosCuentasContable[] }> {
    const generosCuentas = await this.generosCuentasContablesRepository.find({ relations: ['gruposGeneros'] });
    return {
      message: 'Listado de géneros de cuentas contables recuperado con éxito',
      result: true,
      data: generosCuentas,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: GenerosCuentasContable | null }> {
    const generoCuenta = await this.generosCuentasContablesRepository.findOne({
      where: { id_genero_cuenta: id },
      relations: ['gruposGeneros'],
    });

    if (!generoCuenta) {
      return {
        message: `Género de cuenta contable con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Género de cuenta contable con ID ${id} recuperado con éxito`,
      result: true,
      data: generoCuenta,
    };
  }

  async update(id: number, updateGenerosCuentasContableDto: UpdateGenerosCuentasContableDto): Promise<{ message: string; result: boolean; data: GenerosCuentasContable | null }> {
    const generoCuentaExist = await this.generosCuentasContablesRepository.findOne({ where: { id_genero_cuenta: id } });
    
    if (!generoCuentaExist) {
      return {
        message: `Género de cuenta contable con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    const updatedGeneroCuenta = Object.assign(generoCuentaExist, updateGenerosCuentasContableDto);
    await this.generosCuentasContablesRepository.save(updatedGeneroCuenta);

    return {
      message: `Género de cuenta contable con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedGeneroCuenta,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const generoCuenta = await this.generosCuentasContablesRepository.findOne({ where: { id_genero_cuenta: id } });
    if (!generoCuenta) {
      return {
        message: `Género de cuenta contable con ID ${id} no encontrado`,
        result: false,
      };
    }

    await this.generosCuentasContablesRepository.softDelete(id);

    return {
      message: `Género de cuenta contable con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
 
}

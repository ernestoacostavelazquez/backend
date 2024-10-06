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

  async create(createGenerosCuentasContableDto: CreateGenerosCuentasContableDto): Promise<GenerosCuentasContable> {
    const generoCuentaExists = await this.generosCuentasContablesRepository.findOne({
      where: { codigo_genero: createGenerosCuentasContableDto.codigo_genero },
    });

    if (generoCuentaExists) {
      throw new HttpException('El género de cuenta contable ya existe', HttpStatus.CONFLICT);
    }

    const newGeneroCuenta = this.generosCuentasContablesRepository.create(createGenerosCuentasContableDto);
    return this.generosCuentasContablesRepository.save(newGeneroCuenta);
  }

  // Modificación para incluir la relación con grupos_generos_cuentas
  async findAll(): Promise<GenerosCuentasContable[]> {
    return this.generosCuentasContablesRepository.find({
      relations: ['gruposGeneros'],  // Incluir la relación con grupos_generos_cuentas
    });
  }

  // Modificación para incluir la relación con grupos_generos_cuentas
  async findOne(id: number): Promise<GenerosCuentasContable> {
    const generoCuenta = await this.generosCuentasContablesRepository.findOne({
      where: { id_genero_cuenta: id },
      relations: ['gruposGeneros'],  // Incluir la relación con grupos_generos_cuentas
    });

    if (!generoCuenta) {
      throw new NotFoundException(`Género de cuenta contable con ID ${id} no encontrado`);
    }
    
    return generoCuenta;
  }

  async update(id: number, updateGenerosCuentasContableDto: UpdateGenerosCuentasContableDto): Promise<void> {
    const result = await this.generosCuentasContablesRepository.update(id, updateGenerosCuentasContableDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Género de cuenta contable con ID ${id} no encontrado`);
    }
  }

  async remove(id: number): Promise<void> {
    const generoCuenta = await this.generosCuentasContablesRepository.findOne({ where: { id_genero_cuenta: id } });
    if (!generoCuenta) {
      throw new NotFoundException(`Género de cuenta contable con ID ${id} no encontrado`);
    }

    await this.generosCuentasContablesRepository.softDelete(id);
  }
}

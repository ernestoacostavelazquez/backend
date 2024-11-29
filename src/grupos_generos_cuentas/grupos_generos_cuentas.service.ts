//grupos_generos_cuentas.service.ts
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGruposGenerosCuentaDto } from './dto/create-grupos_generos_cuenta.dto';
import { UpdateGruposGenerosCuentaDto } from './dto/update-grupos_generos_cuenta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GruposGenerosCuenta } from './entities/grupos_generos_cuenta.entity';
import { GenerosCuentasContable } from 'src/generos_cuentas_contables/entities/generos_cuentas_contable.entity';

@Injectable()
export class GruposGenerosCuentasService {
  constructor(
    @InjectRepository(GruposGenerosCuenta)
    private readonly gruposGenerosCuentasRepository: Repository<GruposGenerosCuenta>,

    @InjectRepository(GenerosCuentasContable)
    private readonly generosCuentasContablesRepository: Repository<GenerosCuentasContable>,
  ) {}

  async create(createGruposGenerosCuentaDto: CreateGruposGenerosCuentaDto): Promise<{ message: string; result: boolean; data: GruposGenerosCuenta | null }> {
    const { id_genero_cuenta, ...rest } = createGruposGenerosCuentaDto;

    const grupoGeneroExists = await this.gruposGenerosCuentasRepository.findOne({
      where: { codigo_grupo: createGruposGenerosCuentaDto.codigo_grupo },
    });

    if (grupoGeneroExists) {
      return {
        message: 'El grupo de género de cuenta contable ya existe',
        result: false,
        data: null,
      };
    }

    const genero = await this.generosCuentasContablesRepository.findOne({ where: { id_genero_cuenta } });
    if (!genero) {
      throw new NotFoundException('Género de cuenta contable no encontrado');
    }

    const newGrupoGenero = this.gruposGenerosCuentasRepository.create({
      ...rest,
      genero,
    });
    const grupoGeneroCreado = await this.gruposGenerosCuentasRepository.save(newGrupoGenero);

    return {
      message: 'Grupo de género de cuenta contable creado con éxito',
      result: true,
      data: grupoGeneroCreado,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: GruposGenerosCuenta[] }> {
    const gruposGeneros = await this.gruposGenerosCuentasRepository.find({
      relations: ['genero'],
    });
    return {
      message: 'Listado de grupos de géneros de cuentas contables recuperado con éxito',
      result: true,
      data: gruposGeneros,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: GruposGenerosCuenta | null }> {
    const grupoGenero = await this.gruposGenerosCuentasRepository.findOne({
      where: { id_grupo_genero: id },
      relations: ['genero'],
    });
    if (!grupoGenero) {
      return {
        message: `Grupo de género de cuenta con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }
    return {
      message: `Grupo de género de cuenta con ID ${id} recuperado con éxito`,
      result: true,
      data: grupoGenero,
    };
  }

  async update(id: number, updateGruposGenerosCuentaDto: UpdateGruposGenerosCuentaDto): Promise<{ message: string; result: boolean; data: GruposGenerosCuenta | null }> {
    const { id_genero_cuenta, ...rest } = updateGruposGenerosCuentaDto;

    const grupoGenero = await this.gruposGenerosCuentasRepository.findOne({
      where: { id_grupo_genero: id },
      relations: ['genero'],
    });

    if (!grupoGenero) {
      return {
        message: `Grupo de género de cuenta con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    if (id_genero_cuenta) {
      const genero = await this.generosCuentasContablesRepository.findOne({ where: { id_genero_cuenta } });
      if (!genero) {
        throw new NotFoundException('Género de cuenta contable no encontrado');
      }
      grupoGenero.genero = genero;
    }

    Object.assign(grupoGenero, rest);
    const grupoGeneroActualizado = await this.gruposGenerosCuentasRepository.save(grupoGenero);

    return {
      message: `Grupo de género de cuenta con ID ${id} actualizado con éxito`,
      result: true,
      data: grupoGeneroActualizado,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const grupoGenero = await this.gruposGenerosCuentasRepository.findOne({ where: { id_grupo_genero: id } });
    if (!grupoGenero) {
      return {
        message: `Grupo de género de cuenta con ID ${id} no encontrado`,
        result: false,
      };
    }

    await this.gruposGenerosCuentasRepository.softDelete(id);

    return {
      message: `Grupo de género de cuenta con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}

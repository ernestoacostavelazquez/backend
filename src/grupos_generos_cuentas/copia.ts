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
    private readonly generosCuentasContablesRepository: Repository<GenerosCuentasContable>,  // Repositorio para GenerosCuentasContable
  ) {}

  async create(createGruposGenerosCuentaDto: CreateGruposGenerosCuentaDto): Promise<GruposGenerosCuenta> {
    const { id_genero_cuenta, ...rest } = createGruposGenerosCuentaDto;

    // Verificar si el grupo de género de cuenta contable ya existe
    const grupoGeneroExists = await this.gruposGenerosCuentasRepository.findOne({
      where: { codigo_grupo: createGruposGenerosCuentaDto.codigo_grupo },
    });

    if (grupoGeneroExists) {
      throw new HttpException('El grupo de género de cuenta contable ya existe', HttpStatus.CONFLICT);
    }

    // Verificar si el género de cuenta contable existe
    const genero = await this.generosCuentasContablesRepository.findOne({ where: { id_genero_cuenta } });
    if (!genero) {
      throw new NotFoundException('Género de cuenta contable no encontrado');
    }

    // Crear el nuevo grupo y asociar el género de cuenta contable
    const newGrupoGenero = this.gruposGenerosCuentasRepository.create({
      ...rest,
      genero: genero,  // Asociar el género de cuenta contable
    });

    return this.gruposGenerosCuentasRepository.save(newGrupoGenero);
  }

  async findAll(): Promise<GruposGenerosCuenta[]> {
    return this.gruposGenerosCuentasRepository.find({
      relations: ['genero'],  // Incluir la relación con el género
    });
  }

  async findOne(id: number): Promise<GruposGenerosCuenta> {
    const grupoGenero = await this.gruposGenerosCuentasRepository.findOne({
      where: { id_grupo_genero: id },
      relations: ['genero'],  // Incluir la relación con el género
    });
    if (!grupoGenero) {
      throw new NotFoundException(`Grupo de género de cuenta con ID ${id} no encontrado`);
    }
    return grupoGenero;
  }

  async update(id: number, updateGruposGenerosCuentaDto: UpdateGruposGenerosCuentaDto): Promise<void> {
    const { id_genero_cuenta, ...rest } = updateGruposGenerosCuentaDto;

    // Buscar el grupo de género existente
    const grupoGenero = await this.gruposGenerosCuentasRepository.findOne({
      where: { id_grupo_genero: id },
      relations: ['genero'],
    });

    if (!grupoGenero) {
      throw new NotFoundException(`Grupo de género de cuenta con ID ${id} no encontrado`);
    }

    // Verificar si se necesita actualizar el género de cuenta contable
    if (id_genero_cuenta) {
      const genero = await this.generosCuentasContablesRepository.findOne({ where: { id_genero_cuenta } });
      if (!genero) {
        throw new NotFoundException('Género de cuenta contable no encontrado');
      }
      grupoGenero.genero = genero;  // Actualizar la relación con el género
    }

    // Actualizar el resto de los campos
    Object.assign(grupoGenero, rest);

    await this.gruposGenerosCuentasRepository.save(grupoGenero);
  }

  async remove(id: number): Promise<void> {
    const grupoGenero = await this.gruposGenerosCuentasRepository.findOne({ where: { id_grupo_genero: id } });
    if (!grupoGenero) {
      throw new NotFoundException(`Grupo de género de cuenta con ID ${id} no encontrado`);
    }

    await this.gruposGenerosCuentasRepository.softDelete(id);
  }
}

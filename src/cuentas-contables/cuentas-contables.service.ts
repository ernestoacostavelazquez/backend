// cuentas-contables.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCuentasContableDto } from './dto/create-cuentas-contable.dto';
import { UpdateCuentasContableDto } from './dto/update-cuentas-contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CuentasContable } from './entities/cuentas-contable.entity';
import { Repository } from 'typeorm';
import { GruposGenerosCuenta } from 'src/grupos_generos_cuentas/entities/grupos_generos_cuenta.entity';

@Injectable()
export class CuentasContablesService {

  constructor(
    @InjectRepository(CuentasContable)
    private cuentascontableRepository: Repository<CuentasContable>,
    
    @InjectRepository(GruposGenerosCuenta)
    private gruposGenerosRepository: Repository<GruposGenerosCuenta>,  // Repositorio para GruposGenerosCuenta
  ) {}

  

  // Crear nueva cuenta contable con validación de existencia
  async create(createCuentasContableDto: CreateCuentasContableDto): Promise<{ message: string; result: boolean; data: CuentasContable }> {
    const { id_grupo_genero, codigo_cuenta } = createCuentasContableDto;

    // Verificar si el código de cuenta ya existe
    const cuentaExistente = await this.cuentascontableRepository.findOne({ where: { codigo_cuenta } });
    if (cuentaExistente) {
      return {
        message:'La cuenta contable ya existe' ,
        result: false,
        data: null,
      };
    }

    // Verificar si el grupo de género de cuenta existe
    const grupoGenero = await this.gruposGenerosRepository.findOne({ where: { id_grupo_genero } });
    if (!grupoGenero) {
      return {
        message: 'Grupo de género no encontrado',
        result: false,
        data: null,
      };
    }

    // Crear y guardar la cuenta contable
    const newCuenta = this.cuentascontableRepository.create({ ...createCuentasContableDto, grupoGenero });
    const cuentaCreada = await this.cuentascontableRepository.save(newCuenta);

    return {
      message: 'Cuenta contable creada con éxito',
      result: true,
      data: cuentaCreada,
    };
  }


  // Función para encontrar todas las cuentas contables
  async findAll(): Promise<{ message: string; result: boolean; data: CuentasContable[] }> {
    const cuentas = await this.cuentascontableRepository.find({ relations: ['grupoGenero'] });
    return {
      message: 'Listado de cuentas contables recuperado con éxito',
      result: true,
      data: cuentas,
    };
  }

  // Función para encontrar una cuenta contable por su ID
  async findOne(id_cuenta: number): Promise<{ message: string; result: boolean; data: CuentasContable }> {
    const cuenta = await this.cuentascontableRepository.findOne({ where: { id_cuenta }, relations: ['grupoGenero'] });
    if (!cuenta) {
      return {
        message: `Cuenta contable con ID ${id_cuenta} no encontrada`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Cuenta contable con ID ${id_cuenta} recuperada con éxito`,
      result: true,
      data: cuenta,
    };
  }

  // Función para actualizar una cuenta contable existente 
  async update(id_cuenta: number, updateCuentasContableDto: UpdateCuentasContableDto): Promise<{ message: string; result: boolean; data: CuentasContable }> {
    const { id_grupo_genero, ...rest } = updateCuentasContableDto;

    // Buscar la cuenta existente
    const cuenta = await this.cuentascontableRepository.findOne({
      where: { id_cuenta },
      relations: ['grupoGenero'],
    });

    if (!cuenta) {
      return {
        message:'Cuenta no encontrada',
        result: false,
        data: null,
      };
    }

    // Verificar si se necesita actualizar el grupo de género
    if (id_grupo_genero) {
      const grupoGenero = await this.gruposGenerosRepository.findOne({
        where: { id_grupo_genero },
      });

      if (!grupoGenero) {
        return {
          message:'Grupo de género no encontrado',
          result: false,
          data: null,
        };
      }

      cuenta.grupoGenero = grupoGenero;  // Actualizar la relación con el grupo de género
    }

    Object.assign(cuenta, rest);

    const cuentaActualizada = await this.cuentascontableRepository.save(cuenta);

    return {
      message: `Cuenta contable con ID ${id_cuenta} actualizada con éxito`,
      result: true,
      data: cuentaActualizada,
    };
  }


 
  
  // Función para eliminar una cuenta contable por su ID
  async remove(id_cuenta: number): Promise<{ message: string; result: boolean }> {
    const cuenta = await this.cuentascontableRepository.findOne({ where: { id_cuenta } });
    if (!cuenta) {
      return {
        message: `Cuenta contable con ID ${id_cuenta} no encontrada`,
        result: false,
      };
    }

    await this.cuentascontableRepository.softDelete(id_cuenta);
    return {
      message: `Cuenta contable con ID ${id_cuenta} eliminada con éxito`,
      result: true,
    };
  }


  
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFoliosPolizasPeriodoDto } from './dto/create-folios-polizas-periodo.dto';
import { UpdateFoliosPolizasPeriodoDto } from './dto/update-folios-polizas-periodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoliosPolizasPeriodo } from './entities/folios-polizas-periodo.entity';
import { Repository } from 'typeorm';
import { TiposPoliza } from 'src/tipos-poliza/entities/tipos-poliza.entity';
import { PeriodosContable } from 'src/periodos-contables/entities/periodos-contable.entity';

@Injectable()
export class FoliosPolizasPeriodoService {

  constructor(
    @InjectRepository(FoliosPolizasPeriodo)
    private foliosPolizasPeriodoRepository: Repository<FoliosPolizasPeriodo>,

    @InjectRepository(TiposPoliza)
    private tiposPolizaRepository: Repository<TiposPoliza>,

    @InjectRepository(PeriodosContable)
    private periodosContableRepository: Repository<PeriodosContable>,
  ) {}

  // Función para crear un nuevo folio de póliza de periodo
  async create(createFoliosPolizasPeriodoDto: CreateFoliosPolizasPeriodoDto) {
    const { id_tipo_poliza, id_periodo, ...rest } = createFoliosPolizasPeriodoDto;

    // Verificar si el tipo de póliza existe
    const tipoPoliza = await this.tiposPolizaRepository.findOne({
      where: { id_tipo_poliza },
    });

    if (!tipoPoliza) {
      throw new HttpException('Tipo de póliza no encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar si el periodo contable existe
    const periodoContable = await this.periodosContableRepository.findOne({
      where: { id_periodo },
    });

    if (!periodoContable) {
      throw new HttpException('Periodo contable no encontrado', HttpStatus.NOT_FOUND);
    }

    const newFolio = this.foliosPolizasPeriodoRepository.create({
      ...rest,
      tipo_poliza: tipoPoliza,  // Relación con el tipo de póliza
      periodo_contable: periodoContable,  // Relación con el periodo contable
    });

    return await this.foliosPolizasPeriodoRepository.save(newFolio);
  }

  // Función para encontrar todos los folios de pólizas de periodo
  async findAll() {
    return await this.foliosPolizasPeriodoRepository.find({
      relations: ['tipo_poliza', 'periodo_contable'], // Incluir las relaciones con tipo de póliza y periodo contable
    });
  }

  // Función para encontrar un folio por su ID
  async findOne(id_folio_poliza_periodo: number) {
    const folio = await this.foliosPolizasPeriodoRepository.findOne({
      where: { id_folio_poliza_periodo },
      relations: ['tipo_poliza', 'periodo_contable'], // Incluir las relaciones con tipo de póliza y periodo contable
    });

    if (!folio) {
      throw new HttpException('Folio no encontrado', HttpStatus.NOT_FOUND);
    }

    return folio;
  }

  // Función para actualizar un folio existente
  async update(id_folio_poliza_periodo: number, updateFoliosPolizasPeriodoDto: UpdateFoliosPolizasPeriodoDto) {
    const { id_tipo_poliza, id_periodo, ...rest } = updateFoliosPolizasPeriodoDto;

    // Buscar el folio existente
    const folio = await this.foliosPolizasPeriodoRepository.findOne({
      where: { id_folio_poliza_periodo },
      relations: ['tipo_poliza', 'periodo_contable'],
    });

    if (!folio) {
      throw new HttpException('Folio no encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar si se necesita actualizar el tipo de póliza
    if (id_tipo_poliza) {
      const tipoPoliza = await this.tiposPolizaRepository.findOne({
        where: { id_tipo_poliza },
      });

      if (!tipoPoliza) {
        throw new HttpException('Tipo de póliza no encontrado', HttpStatus.NOT_FOUND);
      }

      folio.tipo_poliza = tipoPoliza;  // Actualizar la relación con tipo de póliza
    }

    // Verificar si se necesita actualizar el periodo contable
    if (id_periodo) {
      const periodoContable = await this.periodosContableRepository.findOne({
        where: { id_periodo },
      });

      if (!periodoContable) {
        throw new HttpException('Periodo contable no encontrado', HttpStatus.NOT_FOUND);
      }

      folio.periodo_contable = periodoContable;  // Actualizar la relación con el periodo contable
    }

    Object.assign(folio, rest);

    return await this.foliosPolizasPeriodoRepository.save(folio);
  }

  // Función para eliminar un folio por su ID
  async remove(id_folio_poliza_periodo: number) {
    const folio = await this.foliosPolizasPeriodoRepository.findOne({
      where: { id_folio_poliza_periodo },
    });

    if (!folio) {
      throw new HttpException('Folio no encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.foliosPolizasPeriodoRepository.softDelete({ id_folio_poliza_periodo });
  }
 
}

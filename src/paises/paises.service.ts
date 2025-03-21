// paises.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pais } from './entities/paise.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaisDto } from './dto/create-paise.dto';
import { UpdatePaisDto } from './dto/update-paise.dto';
import { FilterPaisDto} from './dto/filter-paise.dto';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private paisesRepository: Repository<Pais>,
  ) {}

  async create(createPaisDto: CreatePaisDto): Promise<{ message: string; result: boolean; data: Pais }> {
    const paisFound = await this.paisesRepository.findOne({
      where: {
        codigo_iso_alpha2: createPaisDto.codigo_iso_alpha2,
      },
    });
    
    if (paisFound) {
      return {
        message: 'El país ya existe',
        result: false,
        data: null,
      };
    }

    const newPais = this.paisesRepository.create(createPaisDto);
    const paisCreado = await this.paisesRepository.save(newPais);

    return {
      message: 'País creado con éxito',
      result: true,
      data: paisCreado,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: Pais[] }> {
    const paises = await this.paisesRepository.find();
    return {
      message: 'Listado de países recuperado con éxito',
      result: true,
      data: paises,
    };
  }
  
  async filterAll(filters: {
    nombre?: string;
    codigo_iso_alpha2?: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    page: number;
    pageSize: number;
  }) {
    const { nombre, codigo_iso_alpha2, sortBy, sortOrder, page, pageSize } = filters;
    
    const query = this.paisesRepository.createQueryBuilder('pais');
    
    // Aplica filtros si están presentes
    if (nombre) {
      query.andWhere('pais.nombre LIKE :nombre', { nombre: `%${nombre}%` });
    }
    
    if (codigo_iso_alpha2) {
      query.andWhere('pais.codigo_iso_alpha2 = :codigo_iso_alpha2', { codigo_iso_alpha2 });
    }

    // Aplica el ordenamiento
    if (['nombre', 'codigo_iso_alpha2', 'estatus'].includes(sortBy)) {
      query.orderBy(`pais.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }

    // Calcula el offset (skip) y limit (take) para la paginación
    const skip = (page - 1) * pageSize;
    query.skip(skip).take(pageSize);

    // Ejecuta la consulta y devuelve los resultados con el total de registros
    const [data, total] = await query.getManyAndCount();
    

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }


  async findOne(id_pais: number): Promise<{ message: string; result: boolean; data: Pais }> {
    const paisFound = await this.paisesRepository.findOne({
      where: {
        id_pais,
      },
    });

    if (!paisFound) {
      return {
        message: 'País no encontrado',
        result: false,
        data: null,
      };
    }

    return {
      message: `País con ID ${id_pais} recuperado con éxito`,
      result: true,
      data: paisFound,
    };
  }

  async update(id_pais: number, updatePaisDto: UpdatePaisDto): Promise<{ message: string; result: boolean; data: Pais }> {
    const paisFound = await this.paisesRepository.findOne({
      where: {
        id_pais,
      },
    });

    if (!paisFound) {
      return {
        message: 'País no encontrado',
        result: false,
        data: null,
      };
    }

    const updatedPais = Object.assign(paisFound, updatePaisDto);
    await this.paisesRepository.save(updatedPais);

    return {
      message: `País con ID ${id_pais} actualizado con éxito`,
      result: true,
      data: updatedPais,
    };
  }

  async remove(id_pais: number): Promise<{ message: string; result: boolean }> {
    const result = await this.paisesRepository.softDelete({ id_pais });

    if (result.affected === 0) {
      return {
        message: 'País no encontrado',
        result: false,
      };
    }

    return {
      message: `País con ID ${id_pais} eliminado con éxito`,
      result: true,
    };
  }
}

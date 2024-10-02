import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartesAlmacenDto } from './dto/create-partes_almacen.dto';
import { UpdatePartesAlmacenDto } from './dto/update-partes_almacen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartesAlmacen } from './entities/partes_almacen.entity';
import { Almacen } from 'src/almacenes/entities/almacene.entity';
import { MaestroParte } from 'src/maestro_partes/entities/maestro_parte.entity';

@Injectable()
export class PartesAlmacenService {

  constructor(
    @InjectRepository(PartesAlmacen)
    private partesAlmacenRepository: Repository<PartesAlmacen>,

    @InjectRepository(Almacen)
    private almacenRepository: Repository<Almacen>,

    @InjectRepository(MaestroParte)
    private maestroParteRepository: Repository<MaestroParte>,
  ) {}

  // Función para crear una nueva parte en el almacén
  async create(createParteAlmacenDto: CreatePartesAlmacenDto): Promise<PartesAlmacen> {
    const { id_almacen, id_parte, ...rest } = createParteAlmacenDto;

    // Verificar si el almacén existe
    const almacen = await this.almacenRepository.findOne({ where: { id_almacen } });
    if (!almacen) {
      throw new HttpException('Almacén no encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar si la parte del maestro existe
    const parte = await this.maestroParteRepository.findOne({ where: { id_parte } });
    if (!parte) {
      throw new HttpException('Parte del maestro no encontrada', HttpStatus.NOT_FOUND);
    }

    // Crear la nueva parte y asociarla con el almacén y maestro de partes
    const newParteAlmacen = this.partesAlmacenRepository.create({
      ...rest,
      almacen: almacen,  // Relación con almacén
      parte: parte,      // Relación con maestro de partes
    });

    return this.partesAlmacenRepository.save(newParteAlmacen);
  }

  // Función para obtener todas las partes del almacén
  async findAll(): Promise<PartesAlmacen[]> {
    return this.partesAlmacenRepository.find({
      relations: ['almacen', 'parte'], // Incluir la relación con almacén y parte del maestro
    });
  }

  // Función para obtener una parte específica del almacén
  async findOne(id: number): Promise<PartesAlmacen> {
    const parte = await this.partesAlmacenRepository.findOne({
      where: { id_parte_almacen: id },
      relations: ['almacen', 'parte'], // Incluir la relación con almacén y parte del maestro
    });

    if (!parte) {
      throw new HttpException('Parte no encontrada', HttpStatus.NOT_FOUND);
    }

    return parte;
  }

  // Función para actualizar una parte existente en el almacén
  async update(id: number, updateParteAlmacenDto: UpdatePartesAlmacenDto): Promise<void> {
    const { id_almacen, id_parte, ...rest } = updateParteAlmacenDto;

    // Buscar la parte existente
    const parteAlmacen = await this.partesAlmacenRepository.findOne({
      where: { id_parte_almacen: id },
      relations: ['almacen', 'parte'],
    });

    if (!parteAlmacen) {
      throw new HttpException('Parte no encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar si se necesita actualizar el almacén
    if (id_almacen) {
      const almacen = await this.almacenRepository.findOne({ where: { id_almacen } });
      if (!almacen) {
        throw new HttpException('Almacén no encontrado', HttpStatus.NOT_FOUND);
      }
      parteAlmacen.almacen = almacen; // Actualizar la relación con almacén
    }

    // Verificar si se necesita actualizar el maestro de partes
    if (id_parte) {
      const parte = await this.maestroParteRepository.findOne({ where: { id_parte } });
      if (!parte) {
        throw new HttpException('Parte del maestro no encontrada', HttpStatus.NOT_FOUND);
      }
      parteAlmacen.parte = parte; // Actualizar la relación con maestro de partes
    }

    Object.assign(parteAlmacen, rest);

    await this.partesAlmacenRepository.save(parteAlmacen);
  }

  // Función para eliminar una parte del almacén
  async remove(id: number): Promise<void> {
    const parte = await this.partesAlmacenRepository.findOne({ where: { id_parte_almacen: id } });
    if (!parte) {
      throw new HttpException('Parte no encontrada', HttpStatus.NOT_FOUND);
    }
    await this.partesAlmacenRepository.softDelete(id);
  }
}

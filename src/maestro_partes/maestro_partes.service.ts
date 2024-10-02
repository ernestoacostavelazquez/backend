import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMaestroParteDto } from './dto/create-maestro_parte.dto';
import { UpdateMaestroParteDto } from './dto/update-maestro_parte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaestroParte } from './entities/maestro_parte.entity';
import { UnidadMedida } from 'src/unidad_medida/entities/unidad_medida.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';


@Injectable()
export class MaestroPartesService {

  constructor(
    @InjectRepository(MaestroParte)
    private readonly maestroParteRepository: Repository<MaestroParte>,

    @InjectRepository(UnidadMedida)
    private readonly unidadMedidaRepository: Repository<UnidadMedida>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  // Función para crear una nueva parte del maestro de partes
  async create(createMaestroParteDto: CreateMaestroParteDto) {
    const { id_unidad, id_categoria, ...rest } = createMaestroParteDto;

    // Verificar si la unidad de medida existe
    const unidadMedida = await this.unidadMedidaRepository.findOne({
      where: { id_unidad },
    });

    if (!unidadMedida) {
      throw new HttpException('Unidad de medida no encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar si la categoría existe
    const categoria = await this.categoriaRepository.findOne({
      where: { id_categoria },
    });

    if (!categoria) {
      throw new HttpException('Categoría no encontrada', HttpStatus.NOT_FOUND);
    }

    // Crear la nueva parte y asociar la unidad de medida y la categoría
    const newParte = this.maestroParteRepository.create({
      ...rest,
      unidad_medida: unidadMedida,  // Relación con unidad de medida
      categoria: categoria,         // Relación con categoría
    });

    return await this.maestroParteRepository.save(newParte);
  }

  // Función para obtener todas las partes
  async findAll() {
    return await this.maestroParteRepository.find({
      relations: ['unidad_medida', 'categoria'], // Incluir las relaciones con unidad de medida y categoría
    });
  }

  // Función para obtener una parte específica
  async findOne(id: number) {
    const parte = await this.maestroParteRepository.findOne({
      where: { id_parte: id },
      relations: ['unidad_medida', 'categoria'], // Incluir las relaciones con unidad de medida y categoría
    });

    if (!parte) {
      throw new HttpException('Parte no encontrada', HttpStatus.NOT_FOUND);
    }

    return parte;
  }

  // Función para actualizar una parte existente
  async update(id: number, updateMaestroParteDto: UpdateMaestroParteDto) {
    const { id_unidad, id_categoria, ...rest } = updateMaestroParteDto;

    // Buscar la parte existente
    const parte = await this.maestroParteRepository.findOne({
      where: { id_parte: id },
      relations: ['unidad_medida', 'categoria'],
    });

    if (!parte) {
      throw new HttpException('Parte no encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar si se necesita actualizar la unidad de medida
    if (id_unidad) {
      const unidadMedida = await this.unidadMedidaRepository.findOne({
        where: { id_unidad },
      });

      if (!unidadMedida) {
        throw new HttpException('Unidad de medida no encontrada', HttpStatus.NOT_FOUND);
      }

      parte.unidad_medida = unidadMedida;  // Actualizar la relación con unidad de medida
    }

    // Verificar si se necesita actualizar la categoría
    if (id_categoria) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id_categoria },
      });

      if (!categoria) {
        throw new HttpException('Categoría no encontrada', HttpStatus.NOT_FOUND);
      }

      parte.categoria = categoria;  // Actualizar la relación con categoría
    }

    Object.assign(parte, rest);

    return await this.maestroParteRepository.save(parte);
  }

  // Función para eliminar una parte
  async remove(id: number) {
    const parte = await this.maestroParteRepository.findOne({
      where: { id_parte: id },
    });

    if (!parte) {
      throw new HttpException('Parte no encontrada', HttpStatus.NOT_FOUND);
    }

    return await this.maestroParteRepository.softDelete(id);
  }
}

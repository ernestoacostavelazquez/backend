// sub-categorias.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategoria } from './entities/sub-categoria.entity';
import { CreateSubCategoriaDto } from './dto/create-sub-categoria.dto';
import { UpdateSubCategoriaDto } from './dto/update-sub-categoria.dto';

@Injectable()
export class SubCategoriasService {
  constructor(
    @InjectRepository(SubCategoria)
    private readonly subCategoriasRepository: Repository<SubCategoria>,
  ) {}

  async create(createSubCategoriaDto: CreateSubCategoriaDto) {
    const existingSubCategoria = await this.subCategoriasRepository.findOne({
      where: { nombre_sub_categoria: createSubCategoriaDto.nombre_sub_categoria },
    });

    if (existingSubCategoria) {
      return {
        message: 'La sub-categoría ya existe',
        result: false,
        data: null,
      };
    }

    const newSubCategoria = this.subCategoriasRepository.create(createSubCategoriaDto);
    const savedSubCategoria = await this.subCategoriasRepository.save(newSubCategoria);

    return {
      message: 'Sub-categoría creada con éxito',
      result: true,
      data: savedSubCategoria,
    };
  }

  async findAll() {
    const subCategorias = await this.subCategoriasRepository.find();
    return {
      message: 'Listado de sub-categorías recuperado con éxito',
      result: true,
      data: subCategorias,
    };
  }

  async findOne(id: number) {
    const subCategoria = await this.subCategoriasRepository.findOne({ where: { id_sub_categoria: id } });

    if (!subCategoria) {
      return {
        message: 'La sub-categoría no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Sub-categoría con ID ${id} recuperada con éxito`,
      result: true,
      data: subCategoria,
    };
  }

  async update(id: number, updateSubCategoriaDto: UpdateSubCategoriaDto) {
    const subCategoria = await this.subCategoriasRepository.preload({
      id_sub_categoria: id,
      ...updateSubCategoriaDto,
    });

    if (!subCategoria) {
      return {
        message: 'La sub-categoría no existe',
        result: false,
        data: null,
      };
    }

    const updatedSubCategoria = await this.subCategoriasRepository.save(subCategoria);

    return {
      message: `Sub-categoría con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedSubCategoria,
    };
  }

  async remove(id: number) {
    const result = await this.subCategoriasRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'La sub-categoría no existe',
        result: false,
      };
    }

    return {
      message: `Sub-categoría con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}

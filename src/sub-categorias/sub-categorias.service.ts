// sub-categorias.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategoria } from './entities/sub-categoria.entity';
import { CreateSubCategoriaDto } from './dto/create-sub-categoria.dto';
import { UpdateSubCategoriaDto } from './dto/update-sub-categoria.dto';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class SubCategoriasService {
  constructor(
    @InjectRepository(SubCategoria)
    private readonly subCategoriasRepository: Repository<SubCategoria>,
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}

  async create(createSubCategoriaDto: CreateSubCategoriaDto): Promise<{ message: string; result: boolean; data: SubCategoria | null }> {
    const { id_categoria, ...rest } = createSubCategoriaDto;

    const categoria = await this.categoriasRepository.findOne({ where: { id_categoria } });

    if (!categoria) {
      return {
        message: 'Categoría no encontrada',
        result: false,
        data: null,
      };
    }

    const subCategoria = this.subCategoriasRepository.create({ ...rest, categoria });
    const savedSubCategoria = await this.subCategoriasRepository.save(subCategoria);

    return {
      message: 'Subcategoría creada con éxito',
      result: true,
      data: savedSubCategoria,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: SubCategoria[] }> {
    const subCategorias = await this.subCategoriasRepository.find({ relations: ['categoria'] });
    return {
      message: 'Listado de subcategorías recuperado con éxito',
      result: true,
      data: subCategorias,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: SubCategoria | null }> {
    const subCategoria = await this.subCategoriasRepository.findOne({
      where: { id_sub_categoria: id },
      relations: ['categoria'],
    });

    if (!subCategoria) {
      return {
        message: `Subcategoría con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Subcategoría con ID ${id} recuperada con éxito`,
      result: true,
      data: subCategoria,
    };
  }

  async update(id: number, updateSubCategoriaDto: UpdateSubCategoriaDto): Promise<{ message: string; result: boolean; data: SubCategoria | null }> {
    const { id_categoria, ...rest } = updateSubCategoriaDto;

    const subCategoria = await this.subCategoriasRepository.findOne({ where: { id_sub_categoria: id } });

    if (!subCategoria) {
      return {
        message: `Subcategoría con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    if (id_categoria) {
      const categoria = await this.categoriasRepository.findOne({ where: { id_categoria } });

      if (!categoria) {
        return {
          message: 'Categoría no encontrada',
          result: false,
          data: null,
        };
      }

      subCategoria.categoria = categoria;
    }

    Object.assign(subCategoria, rest);

    const updatedSubCategoria = await this.subCategoriasRepository.save(subCategoria);

    return {
      message: `Subcategoría con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedSubCategoria,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.subCategoriasRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: `Subcategoría con ID ${id} no encontrada`,
        result: false,
      };
    }

    return {
      message: `Subcategoría con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}

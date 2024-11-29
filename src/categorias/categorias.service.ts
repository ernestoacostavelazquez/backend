// categorias.service.ts
import { Injectable} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<{ message: string; result: boolean; data: Categoria | null }> {
    // Verificar si la categoría ya existe
    const categoriaExist = await this.categoriasRepository.findOne({
      where: { nombre_categoria: createCategoriaDto.nombre_categoria },
    });

    if (categoriaExist) {
      return {
        message: 'La categoría ya existe',
        result: false,
        data: null,
      };
    }

    const nuevaCategoria = this.categoriasRepository.create(createCategoriaDto);
    const categoriaCreada = await this.categoriasRepository.save(nuevaCategoria);

    return {
      message: 'Categoría creada con éxito',
      result: true,
      data: categoriaCreada,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: Categoria[] }> {
    const categorias = await this.categoriasRepository.find();
    return {
      message: 'Listado de categorías recuperado con éxito',
      result: true,
      data: categorias,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: Categoria | null }> {
    const categoria = await this.categoriasRepository.findOneBy({ id_categoria: id });

    if (!categoria) {
      return {
        message: `Categoría con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Categoría con ID ${id} recuperada con éxito`,
      result: true,
      data: categoria,
    };
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<{ message: string; result: boolean; data: Categoria | null }> {
    const categoriaExist = await this.categoriasRepository.findOneBy({ id_categoria: id });

    if (!categoriaExist) {
      return {
        message: `Categoría con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    const categoriaActualizada = Object.assign(categoriaExist, updateCategoriaDto);
    await this.categoriasRepository.save(categoriaActualizada);

    return {
      message: `Categoría con ID ${id} actualizada con éxito`,
      result: true,
      data: categoriaActualizada,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const categoria = await this.categoriasRepository.findOneBy({ id_categoria: id });

    if (!categoria) {
      return {
        message: `Categoría con ID ${id} no encontrada`,
        result: false,
      };
    }

    await this.categoriasRepository.softDelete(id);

    return {
      message: `Categoría con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}

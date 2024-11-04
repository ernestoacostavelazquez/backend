import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GenerosService {

  constructor(
    @InjectRepository(Genero)
    private readonly generosRepository: Repository<Genero>,
  ) {}

  async create(createGeneroDto: CreateGeneroDto): Promise<{ message: string; result: boolean; data: Genero | null }> {
    const generoExists = await this.generosRepository.findOne({ where: { nombre_genero: createGeneroDto.nombre_genero } });

    if (generoExists) {
      return {
        message: 'El género ya existe',
        result: false,
        data: null,
      };
    }

    const newGenero = this.generosRepository.create(createGeneroDto);
    const generoCreado = await this.generosRepository.save(newGenero);

    return {
      message: 'Género creado con éxito',
      result: true,
      data: generoCreado,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: Genero[] }> {
    const generos = await this.generosRepository.find();
    return {
      message: 'Listado de géneros recuperado con éxito',
      result: true,
      data: generos,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: Genero | null }> {
    const genero = await this.generosRepository.findOne({ where: { id_genero: id } });
    
    if (!genero) {
      return {
        message: `Género con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Género con ID ${id} recuperado con éxito`,
      result: true,
      data: genero,
    };
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<{ message: string; result: boolean; data: Genero | null }> {
    const generoExists = await this.generosRepository.findOne({ where: { id_genero: id } });

    if (!generoExists) {
      return {
        message: `Género con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    const updatedGenero = Object.assign(generoExists, updateGeneroDto);
    await this.generosRepository.save(updatedGenero);

    return {
      message: `Género con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedGenero,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const genero = await this.generosRepository.findOne({ where: { id_genero: id } });
    
    if (!genero) {
      return {
        message: `Género con ID ${id} no encontrado`,
        result: false,
      };
    }

    await this.generosRepository.softDelete(id);

    return {
      message: `Género con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}

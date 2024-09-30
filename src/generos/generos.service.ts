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

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    const generoExists = await this.generosRepository.findOne({ where: { nombre_genero: createGeneroDto.nombre_genero } });

    if (generoExists) {
      throw new HttpException('El género ya existe', HttpStatus.CONFLICT);
    }

    const newGenero = this.generosRepository.create(createGeneroDto);
    return this.generosRepository.save(newGenero);
  }

  async findAll(): Promise<Genero[]> {
    return this.generosRepository.find();
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.generosRepository.findOne({ where: { id_genero: id } });
    if (!genero) {
      throw new NotFoundException(`Género con ID ${id} no encontrado`);
    }
    return genero;
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<void> {
    const result = await this.generosRepository.update(id, updateGeneroDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Género con ID ${id} no encontrado`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.generosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Género con ID ${id} no encontrado`);
    }
  }
 
}

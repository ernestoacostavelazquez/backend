import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadosCivilDto } from './dto/create-estados_civil.dto';
import { UpdateEstadosCivilDto } from './dto/update-estados_civil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadosCivil } from './entities/estados_civil.entity';

@Injectable()
export class EstadosCivilService {

  constructor(
    @InjectRepository(EstadosCivil)
    private readonly estadosCivilRepository: Repository<EstadosCivil>,
  ) {}

  async create(createEstadoCivilDto: CreateEstadosCivilDto): Promise<EstadosCivil> {
    const estadoCivilExist = await this.estadosCivilRepository.findOne({
      where: { nombre_estado: createEstadoCivilDto.nombre_estado },
    });

    if (estadoCivilExist) {
      throw new HttpException('El estado civil ya existe', HttpStatus.CONFLICT);
    }

    const nuevoEstadoCivil = this.estadosCivilRepository.create(createEstadoCivilDto);
    return this.estadosCivilRepository.save(nuevoEstadoCivil);
  }

  async findAll(): Promise<EstadosCivil[]> {
    return this.estadosCivilRepository.find();
  }

  async findOne(id: number): Promise<EstadosCivil> {
    const estadoCivil = await this.estadosCivilRepository.findOne({ where: { id_estado_civil: id } });
    if (!estadoCivil) {
      throw new NotFoundException(`Estado civil con ID ${id} no encontrado`);
    }
    return estadoCivil;
  }

  async update(id: number, updateEstadoCivilDto: UpdateEstadosCivilDto): Promise<void> {
    const result = await this.estadosCivilRepository.update(id, updateEstadoCivilDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Estado civil con ID ${id} no encontrado`);
    }
  }

  async remove(id: number): Promise<void> {
    // Verificar si el estado civil existe antes de eliminar
    const estadoCivil = await this.estadosCivilRepository.findOne({ where: { id_estado_civil: id } });
    if (!estadoCivil) {
      throw new NotFoundException(`Estado civil con ID ${id} no encontrado`);
    }

    await this.estadosCivilRepository.delete(id);
  }
  
}

import { Injectable } from '@nestjs/common';
import { CreateMaestroParteDto } from './dto/create-maestro_parte.dto';
import { UpdateMaestroParteDto } from './dto/update-maestro_parte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaestroParte } from './entities/maestro_parte.entity';
@Injectable()
export class MaestroPartesService {

  constructor(
    @InjectRepository(MaestroParte)
    private readonly maestroParteRepository: Repository<MaestroParte>,
  ) {}

  create(createMaestroParteDto: CreateMaestroParteDto) {
    const newParte = this.maestroParteRepository.create(createMaestroParteDto);
    return this.maestroParteRepository.save(newParte);
  }

  findAll() {
    return this.maestroParteRepository.find();
  }

  findOne(id: number) {
    return this.maestroParteRepository.findOneBy({ id_parte: id });
  }

  async update(id: number, updateMaestroParteDto: Partial<CreateMaestroParteDto>) {
    await this.maestroParteRepository.update(id, updateMaestroParteDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.maestroParteRepository.delete(id);
  }
  
}

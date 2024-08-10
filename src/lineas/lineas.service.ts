import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { Repository } from 'typeorm';
import { Linea } from './entities/linea.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LineasService {

  constructor(
    @InjectRepository(Linea)   
    private  lineasRepository:Repository<Linea>
  ){

  }

  async create(createLineaDto: CreateLineaDto) {
    const lineaFound = await this.lineasRepository.findOne({
      where:{
        descripcion:createLineaDto.descripcion
      }
    })
    if(lineaFound){
      return new HttpException('Linea ya Existe',HttpStatus.CONFLICT)
    }

    const newLinea = this.lineasRepository.create(createLineaDto)
    return this.lineasRepository.save(newLinea);
  }

  async findAll() {
    return await this.lineasRepository.find();
  }

  async findOne(id: number) {
    const lineaFound = await this.lineasRepository.findOne({
      where:{
        id,
      }
    })
    if (!lineaFound){
      return new HttpException('Linea no Existe',HttpStatus.NOT_FOUND)
    }
    return lineaFound;
  }

  async update(id: number, updateLineaDto: UpdateLineaDto) {
    const lineaFound = await this.lineasRepository.findOne({
      where:{
        id
      }
    })

    if(!lineaFound){
      return new HttpException('Linea no Existe',HttpStatus.NOT_FOUND)
    }
    const updateLinea = Object.assign(lineaFound,updateLineaDto);
    return this.lineasRepository.save(updateLinea);
  }

  async remove(id: number) {
    const result = await this.lineasRepository.softDelete({id})

    if(result.affected === 0){
      return new HttpException('Linea no Existe', HttpStatus.NOT_FOUND)
    }
    return result;
  }
}

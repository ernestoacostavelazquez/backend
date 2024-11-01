import { Injectable } from '@nestjs/common';
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

  async create(createLineaDto: CreateLineaDto):Promise<{message:string, result:boolean, data:Linea}> {
    const lineaFound = await this.lineasRepository.findOne({
      where:{
        nombre:createLineaDto.nombre
      }
    })
    if(lineaFound){
      // Si la linea ya existe, retornar la información del mismo
      return {
        message: 'Linea ya existe',
        result:false,
        data:null
      }

    }

    const newLinea = this.lineasRepository.create(createLineaDto)
    const lineaCreada = await this.lineasRepository.save(newLinea);

    return{
      message: 'Linea creada con éxito',
      result:true,
      data:lineaCreada
    }
  }

  async findAll():Promise<{message:string,result:boolean, data:Linea[]}> {
     const lineas = await this.lineasRepository.find();
     return{
      message:"Listado de lineas recuperado con éxito",
      result: true,
      data:lineas
     }
  }

  async findOne(id_linea: number) {
    const lineaFound = await this.lineasRepository.findOne({
      where:{
        id_linea,
      }
    })
    if (!lineaFound){
      return{
        message:'Linea no Existe',
        result:false,
        data:null
      }
    }
    return {
      message: `Linea con ID ${id_linea} recuperado con éxito`,
      result: true,
      data: lineaFound
    };
  }

  async update(id_linea: number, updateLineaDto: UpdateLineaDto):Promise<{message:string,result:boolean, data:Linea}> {
    const lineaFound = await this.lineasRepository.findOne({
      where:{
        id_linea
      }
    })

    if(!lineaFound){
      return{
        message:'Linea no Existe',
        result:false,
        data:null
      }
      
    }
    const updateLinea = Object.assign(lineaFound,updateLineaDto);
    await this.lineasRepository.save(updateLinea);

    return{
      message: `Linea con ID ${id_linea} actualizado con éxito`,
      result: true,
      data : updateLinea
    }
  }

  async remove(id_linea: number): Promise<{message:string, result:boolean}> {
    const result = await this.lineasRepository.softDelete({id_linea})

    if(result.affected === 0){
      return{
        message:'Linea no Existe',
        result:false
      }
    }

    return{
      message:`Almacen con ID ${id_linea} eliminado con éxito`,
      result: true
    }
    
  }
}

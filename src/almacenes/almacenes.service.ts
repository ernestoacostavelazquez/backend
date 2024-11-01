import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlmaceneDto } from './dto/create-almacene.dto';
import { UpdateAlmaceneDto } from './dto/update-almacene.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Almacen } from './entities/almacene.entity';

@Injectable()
export class AlmacenesService {
  
  constructor(
    @InjectRepository(Almacen)
    private almacenesRepository: Repository<Almacen>,
  ) {}

  async create(createAlmacenDto: CreateAlmaceneDto): Promise<{message:string, result:boolean, data:Almacen}> {
    // Verificar si el nombre del almacén ya existe
    const almacenFound = await this.almacenesRepository.findOne({
      where: {
        nombre: createAlmacenDto.nombre
      }
    });

    if (almacenFound) {
      // Si el almacén ya existe, retornar la información del mismo
      return {
        message: 'Almacen ya existe',
        result:false,
        data:null
      }
    }

    const nuevoAlmacen = this.almacenesRepository.create(createAlmacenDto);
    const almacenCreado =  await this.almacenesRepository.save(nuevoAlmacen);

    return{
      message:'Almacen creado con éxito',
      result: true,
      data: almacenCreado
    }
  }

  async findAll(): Promise<{ message: string, result: boolean, data: Almacen[] }> {
    const almacenes = await this.almacenesRepository.find();
    
    return {
      message: "Listado de almacenes recuperado con éxito",
      result: true,
      data: almacenes
    };
  }

  async findOne(id: number): Promise<{ message: string, result: boolean, data: Almacen }> {
    const almacenFound = await this.almacenesRepository.findOneBy({ id_almacen: id });

    if (!almacenFound) {
      return {
        message: 'Alamacen no Existe',
        result:false,
        data: null
      }

    }

    return {
      message: `Almacén con ID ${id} recuperado con éxito`,
      result: true,
      data: almacenFound
    };
  }

  async update(id: number, updateAlmacenDto: UpdateAlmaceneDto): Promise<{ message: string, result: boolean, data: Almacen }> {
    const almacenFound = await this.almacenesRepository.findOneBy({ id_almacen: id });

    if (!almacenFound) {
      return{
        message:'Almacen no Existe',
        result: false,
        data:null
      }
    }

    const updatedAlmacen = Object.assign(almacenFound, updateAlmacenDto);
    await this.almacenesRepository.save(updatedAlmacen);
    
    return {
      message: `Almacén con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedAlmacen
    };
  }

  async remove(id: number): Promise<{ message: string, result: boolean }> {
    const result = await this.almacenesRepository.softDelete({ id_almacen: id });

    if (result.affected === 0) {
      return{
        message:'Almacen no Existe',
        result:false
      }
    }

    return {
      message: `Almacén con ID ${id} eliminado con éxito`,
      result: true
    };
  }
}

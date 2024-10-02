import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDomiciliosPersonaDto } from './dto/create-domicilios_persona.dto';
import { UpdateDomiciliosPersonaDto } from './dto/update-domicilios_persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomiciliosPersona } from './entities/domicilios_persona.entity';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';
import { CodigosPostal } from 'src/codigos_postales/entities/codigos_postale.entity';
import { TiposDomicilio } from 'src/tipos_domicilios/entities/tipos_domicilio.entity';

@Injectable()
export class DomiciliosPersonaService {
 
  constructor(
    @InjectRepository(DomiciliosPersona)
    private readonly domiciliosPersonaRepository: Repository<DomiciliosPersona>,

    @InjectRepository(MaestroPersona)
    private readonly maestroPersonasRepository: Repository<MaestroPersona>, // Repositorio para MaestroPersona

    @InjectRepository(CodigosPostal)
    private readonly codigosPostalesRepository: Repository<CodigosPostal>, // Repositorio para CodigosPostal

    @InjectRepository(TiposDomicilio)
    private readonly tiposDomiciliosRepository: Repository<TiposDomicilio>, // Repositorio para TiposDomicilio
  ) {}

  // Función para crear un nuevo domicilio
  async create(createDomicilioPersonaDto: CreateDomiciliosPersonaDto): Promise<DomiciliosPersona> {
    const { id_persona, id_codigo_postal, id_tipo_domicilio, ...rest } = createDomicilioPersonaDto;

    // Verificar si la persona existe
    const persona = await this.maestroPersonasRepository.findOne({ where: { id_persona } });
    if (!persona) {
      throw new NotFoundException('Persona no encontrada');
    }

    // Verificar si el código postal existe
    const codigoPostal = await this.codigosPostalesRepository.findOne({ where: { id_codigo_postal } });
    if (!codigoPostal) {
      throw new NotFoundException('Código postal no encontrado');
    }

    // Verificar si el tipo de domicilio existe
    const tipoDomicilio = await this.tiposDomiciliosRepository.findOne({ where: { id_tipo_domicilio } });
    if (!tipoDomicilio) {
      throw new NotFoundException('Tipo de domicilio no encontrado');
    }

    // Crear el nuevo domicilio y asociarlo con la persona, código postal y tipo de domicilio
    const nuevoDomicilio = this.domiciliosPersonaRepository.create({
      ...rest,
      persona: persona, // Asociar la persona
      codigo_postal: codigoPostal, // Asociar el código postal
      tipo_domicilio: tipoDomicilio, // Asociar el tipo de domicilio
    });

    return this.domiciliosPersonaRepository.save(nuevoDomicilio);
  }

  // Función para obtener todos los domicilios
  async findAll(): Promise<DomiciliosPersona[]> {
    return this.domiciliosPersonaRepository.find({
      relations: ['persona', 'codigo_postal', 'tipo_domicilio'], // Incluir la relación con persona, código postal y tipo de domicilio
    });
  }

  // Función para obtener un domicilio por su ID
  async findOne(id: number): Promise<DomiciliosPersona> {
    const domicilio = await this.domiciliosPersonaRepository.findOne({
      where: { id_domicilio: id },
      relations: ['persona', 'codigo_postal', 'tipo_domicilio'], // Incluir la relación con persona, código postal y tipo de domicilio
    });
    if (!domicilio) {
      throw new NotFoundException(`Domicilio con ID ${id} no encontrado`);
    }
    return domicilio;
  }

  // Función para actualizar un domicilio
  async update(id: number, updateDomicilioPersonaDto: UpdateDomiciliosPersonaDto): Promise<void> {
    const { id_persona, id_codigo_postal, id_tipo_domicilio, ...rest } = updateDomicilioPersonaDto;

    // Buscar el domicilio existente
    const domicilio = await this.domiciliosPersonaRepository.findOne({
      where: { id_domicilio: id },
      relations: ['persona', 'codigo_postal', 'tipo_domicilio'],
    });

    if (!domicilio) {
      throw new NotFoundException(`Domicilio con ID ${id} no encontrado`);
    }

    // Verificar si se necesita actualizar la persona
    if (id_persona) {
      const persona = await this.maestroPersonasRepository.findOne({ where: { id_persona } });
      if (!persona) {
        throw new NotFoundException('Persona no encontrada');
      }
      domicilio.persona = persona; // Actualizar la relación con persona
    }

    // Verificar si se necesita actualizar el código postal
    if (id_codigo_postal) {
      const codigoPostal = await this.codigosPostalesRepository.findOne({ where: { id_codigo_postal } });
      if (!codigoPostal) {
        throw new NotFoundException('Código postal no encontrado');
      }
      domicilio.codigo_postal = codigoPostal; // Actualizar la relación con código postal
    }

    // Verificar si se necesita actualizar el tipo de domicilio
    if (id_tipo_domicilio) {
      const tipoDomicilio = await this.tiposDomiciliosRepository.findOne({ where: { id_tipo_domicilio } });
      if (!tipoDomicilio) {
        throw new NotFoundException('Tipo de domicilio no encontrado');
      }
      domicilio.tipo_domicilio = tipoDomicilio; // Actualizar la relación con tipo de domicilio
    }

    Object.assign(domicilio, rest);

    await this.domiciliosPersonaRepository.save(domicilio);
  }

  // Función para eliminar un domicilio
  async remove(id: number): Promise<void> {
    const domicilio = await this.domiciliosPersonaRepository.findOne({
      where: { id_domicilio: id },
    });

    if (!domicilio) {
      throw new NotFoundException(`Domicilio con ID ${id} no encontrado`);
    }

    await this.domiciliosPersonaRepository.softDelete(id);
  }
}

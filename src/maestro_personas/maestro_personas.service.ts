import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaestroPersonaDto } from './dto/create-maestro_persona.dto';
import { UpdateMaestroPersonaDto } from './dto/update-maestro_persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaestroPersona } from './entities/maestro_persona.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import { TiposPersona } from 'src/tipos_persona/entities/tipos_persona.entity';
import { EstadosCivil } from 'src/estados_civil/entities/estados_civil.entity';


@Injectable()
export class MaestroPersonasService {
 
  constructor(
    @InjectRepository(MaestroPersona)
    private readonly maestroPersonasRepository: Repository<MaestroPersona>,

    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,

    @InjectRepository(TiposPersona)
    private readonly tiposPersonaRepository: Repository<TiposPersona>,

    @InjectRepository(EstadosCivil)
    private readonly estadosCivilRepository: Repository<EstadosCivil>,

 
  ) {}

  // Función para crear una nueva persona
  async create(createMaestroPersonaDto: CreateMaestroPersonaDto): Promise<MaestroPersona> {
    const { id_genero, id_tipo_persona, id_estado_civil, ...rest } = createMaestroPersonaDto;

    // Verificar si el RFC ya existe en la base de datos
    const personaExistente = await this.maestroPersonasRepository.findOne({
      where: { rfc: createMaestroPersonaDto.rfc },
    });

    if (personaExistente) {
      throw new ConflictException('RFC ya existe');
    }

    // Verificar si el género existe
    const genero = await this.generoRepository.findOne({ where: { id_genero } });
    if (!genero) {
      throw new NotFoundException('Género no encontrado');
    }

    // Verificar si el tipo de persona existe
    const tipoPersona = await this.tiposPersonaRepository.findOne({ where: { id_tipo_persona } });
    if (!tipoPersona) {
      throw new NotFoundException('Tipo de persona no encontrado');
    }

    // Verificar si el estado civil existe
    const estadoCivil = await this.estadosCivilRepository.findOne({ where: { id_estado_civil } });
    if (!estadoCivil) {
      throw new NotFoundException('Estado civil no encontrado');
    }

    // Crear la nueva persona asociando la persona física, el género, el tipo de persona y el estado civil
    const nuevaPersona = this.maestroPersonasRepository.create({
      ...rest,
      genero: genero,
      tipo_persona: tipoPersona,
      estado_civil: estadoCivil,
    });

    return this.maestroPersonasRepository.save(nuevaPersona);
  }

  // Función para obtener todas las personas
  async findAll(): Promise<MaestroPersona[]> {
    return this.maestroPersonasRepository.find({
      relations: ['genero', 'tipo_persona', 'estado_civil'], 
    });
  }

  // Función para obtener una persona por su ID
  async findOne(id: number): Promise<MaestroPersona> {
    const persona = await this.maestroPersonasRepository.findOne({
      where: { id_persona: id },
      relations: ['genero', 'tipo_persona', 'estado_civil'],
    });
    if (!persona) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }
    return persona;
  }

  // Función para actualizar una persona
  async update(id: number, updateMaestroPersonaDto: UpdateMaestroPersonaDto): Promise<void> {
    const { id_genero, id_tipo_persona, id_estado_civil, ...rest } = updateMaestroPersonaDto;

    // Buscar la persona existente
    const persona = await this.maestroPersonasRepository.findOne({
      where: { id_persona: id },
      relations: ['genero', 'tipo_persona', 'estado_civil'],
    });

    if (!persona) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }

    // Verificar si se necesita actualizar el género
    if (id_genero) {
      const genero = await this.generoRepository.findOne({ where: { id_genero } });
      if (!genero) {
        throw new NotFoundException('Género no encontrado');
      }
      persona.genero = genero;
    }

    // Verificar si se necesita actualizar el tipo de persona
    if (id_tipo_persona) {
      const tipoPersona = await this.tiposPersonaRepository.findOne({ where: { id_tipo_persona } });
      if (!tipoPersona) {
        throw new NotFoundException('Tipo de persona no encontrado');
      }
      persona.tipo_persona = tipoPersona;
    }

    // Verificar si se necesita actualizar el estado civil
    if (id_estado_civil) {
      const estadoCivil = await this.estadosCivilRepository.findOne({ where: { id_estado_civil } });
      if (!estadoCivil) {
        throw new NotFoundException('Estado civil no encontrado');
      }
      persona.estado_civil = estadoCivil;
    }

   
    Object.assign(persona, rest);
    await this.maestroPersonasRepository.save(persona);
  }

  // Función para eliminar una persona
  async remove(id: number): Promise<void> {
    const persona = await this.maestroPersonasRepository.findOne({
      where: { id_persona: id },
    });

    if (!persona) {
      throw new NotFoundException('Persona no existe');
    }

    await this.maestroPersonasRepository.softDelete(id);
  }
}

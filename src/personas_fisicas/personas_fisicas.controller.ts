import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
import { PersonasFisicasService } from './personas_fisicas.service';
import { CreatePersonasFisicaDto } from './dto/create-personas_fisica.dto';
import { UpdatePersonasFisicaDto } from './dto/update-personas_fisica.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('PersonasFisicas')
@Controller('PersonasFisicas')
export class PersonasFisicasController {
  constructor(private readonly personasFisicasService: PersonasFisicasService) {}

  @Post()
  create(@Body() createPersonasFisicaDto: CreatePersonasFisicaDto) {
    return this.personasFisicasService.create(createPersonasFisicaDto);
  }

  @Get()
  findAll() {
    return this.personasFisicasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personasFisicasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePersonasFisicaDto: UpdatePersonasFisicaDto) {
    return this.personasFisicasService.update(+id, updatePersonasFisicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personasFisicasService.remove(+id);
  }
}

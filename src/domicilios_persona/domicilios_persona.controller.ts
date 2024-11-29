import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DomiciliosPersonaService } from './domicilios_persona.service';
import { CreateDomiciliosPersonaDto } from './dto/create-domicilios_persona.dto';
import { UpdateDomiciliosPersonaDto } from './dto/update-domicilios_persona.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('DomiciliosPersona')
@Controller('DomiciliosPersona')
export class DomiciliosPersonaController {
  constructor(private readonly domiciliosPersonaService: DomiciliosPersonaService) {}

  @Post()
  create(@Body() createDomiciliosPersonaDto: CreateDomiciliosPersonaDto) {
    return this.domiciliosPersonaService.create(createDomiciliosPersonaDto);
  }

  @Get()
  findAll() {
    return this.domiciliosPersonaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domiciliosPersonaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDomiciliosPersonaDto: UpdateDomiciliosPersonaDto) {
    return this.domiciliosPersonaService.update(+id, updateDomiciliosPersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domiciliosPersonaService.remove(+id);
  }
}

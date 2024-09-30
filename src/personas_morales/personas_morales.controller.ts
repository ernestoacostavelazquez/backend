import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonasMoralesService } from './personas_morales.service';
import { CreatePersonasMoraleDto } from './dto/create-personas_morale.dto';
import { UpdatePersonasMoraleDto } from './dto/update-personas_morale.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('PersonasMorales')
@Controller('PersonasMorales')
export class PersonasMoralesController {
  constructor(private readonly personasMoralesService: PersonasMoralesService) {}

  @Post()
  create(@Body() createPersonasMoraleDto: CreatePersonasMoraleDto) {
    return this.personasMoralesService.create(createPersonasMoraleDto);
  }

  @Get()
  findAll() {
    return this.personasMoralesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personasMoralesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonasMoraleDto: UpdatePersonasMoraleDto) {
    return this.personasMoralesService.update(+id, updatePersonasMoraleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personasMoralesService.remove(+id);
  }
}

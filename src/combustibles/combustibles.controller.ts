import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CombustiblesService } from './combustibles.service';
import { CreateCombustibleDto } from './dto/create-combustible.dto';
import { UpdateCombustibleDto } from './dto/update-combustible.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Combustibles')
@Controller('Combustibles')
export class CombustiblesController {
  constructor(private readonly combustiblesService: CombustiblesService) {}

  @Post()
  create(@Body() createCombustibleDto: CreateCombustibleDto) {
    return this.combustiblesService.create(createCombustibleDto);
  }

  @Get()
  findAll() {
    return this.combustiblesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.combustiblesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCombustibleDto: UpdateCombustibleDto) {
    return this.combustiblesService.update(+id, updateCombustibleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combustiblesService.remove(+id);
  }
}

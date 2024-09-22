import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PeriodosContablesService } from './periodos-contables.service';
import { CreatePeriodosContableDto } from './dto/create-periodos-contable.dto';
import { UpdatePeriodosContableDto } from './dto/update-periodos-contable.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('PeriodosContables')
@Controller('PeriodosContables')
export class PeriodosContablesController {
  constructor(private readonly periodosContablesService: PeriodosContablesService) {}

  @Post()
  create(@Body() createPeriodosContableDto: CreatePeriodosContableDto) {
    return this.periodosContablesService.create(createPeriodosContableDto);
  }

  @Get()
  findAll() {
    return this.periodosContablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodosContablesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePeriodosContableDto: UpdatePeriodosContableDto) {
    return this.periodosContablesService.update(+id, updatePeriodosContableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodosContablesService.remove(+id);
  }
}

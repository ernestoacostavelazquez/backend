import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PolizasContablesService } from './polizas-contables.service';
import { CreatePolizasContableDto } from './dto/create-polizas-contable.dto';
import { UpdatePolizasContableDto } from './dto/update-polizas-contable.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('PolizasContables')
@Controller('PolizasContables')
export class PolizasContablesController {
  constructor(private readonly polizasContablesService: PolizasContablesService) {}
  @Post()
  create(@Body() createPolizasContableDto: CreatePolizasContableDto) {
    return this.polizasContablesService.create(createPolizasContableDto);
  }

  @Get()
  findAll() {
    return this.polizasContablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.polizasContablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolizasContableDto: UpdatePolizasContableDto) {
    return this.polizasContablesService.update(+id, updatePolizasContableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.polizasContablesService.remove(+id);
  }
}

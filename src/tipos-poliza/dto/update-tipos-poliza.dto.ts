import { PartialType } from '@nestjs/swagger';
import { CreateTiposPolizaDto } from './create-tipos-poliza.dto';

export class UpdateTiposPolizaDto extends PartialType(CreateTiposPolizaDto) {}

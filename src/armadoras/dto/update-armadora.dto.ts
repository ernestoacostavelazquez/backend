import { PartialType } from '@nestjs/swagger';
import { CreateArmadoraDto } from './create-armadora.dto';

export class UpdateArmadoraDto extends PartialType(CreateArmadoraDto) {}

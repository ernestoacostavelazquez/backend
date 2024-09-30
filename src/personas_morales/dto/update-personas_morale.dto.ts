import { PartialType } from '@nestjs/swagger';
import { CreatePersonasMoraleDto } from './create-personas_morale.dto';

export class UpdatePersonasMoraleDto extends PartialType(CreatePersonasMoraleDto) {}

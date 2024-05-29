import {
  IsString,
  IsNotEmpty,
  IsISO8601,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsISO8601()
  @IsNotEmpty()
  dueDate: Date;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

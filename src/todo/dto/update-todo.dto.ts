import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsBoolean()
  readonly isCompleted?: boolean;
}

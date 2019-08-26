import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsNotEmpty()
  @ApiModelProperty()
  readonly name: string;
}

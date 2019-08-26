import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly status: boolean;
}

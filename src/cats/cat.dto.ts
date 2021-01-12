import { ApiProperty } from "@nestjs/swagger";

export class CatDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}

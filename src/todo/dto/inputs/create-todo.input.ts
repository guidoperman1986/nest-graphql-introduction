/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, {
    description: 'What needs to be done',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  description: string;
}

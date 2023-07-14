/* eslint-disable prettier/prettier */

import { Field, Int, ObjectType } from '@nestjs/graphql';

/* eslint-disable @typescript-eslint/no-inferrable-types */
@ObjectType()
export class Todo {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  description: string;
  @Field(() => Boolean)
  done: boolean = false;
}

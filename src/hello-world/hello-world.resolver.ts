import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: 'Retorna solo hola mundo',
    name: 'hello',
  })
  helloWorld(): string {
    return 'Hello World';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { name: 'randomFromZeroTo' })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int, nullable: true }) to = 6,
  ): number {
    return Math.ceil(Math.random() * to);
  }
}

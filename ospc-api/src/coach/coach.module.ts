import { forwardRef, Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachResolver } from './coach.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [CoachResolver, CoachService],
})
export class CoachModule {}

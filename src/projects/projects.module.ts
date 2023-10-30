import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  controllers: [ProjectsController, ],
  providers: [ProjectsService,PrismaService,TasksService],
})
export class ProjectsModule {}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma:PrismaService, private taskService: TasksService) {}

  async create(createProjectDto: Prisma.ProjectCreateInput) {
    return this.prisma.project.create({
      data:createProjectDto
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        tasks: true, 
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({
      where:{id},
      include:{
        tasks: true,
      }
    });
  }

  async updateProjectInfo(id: number, updateProjectDto: Prisma.ProjectUncheckedUpdateInput) {
    return this.prisma.project.update({
          where:{id},
          data:updateProjectDto
        });
  }

  async findProjectsForUser(userId){
    const tasks = await this.taskService.findAll(userId);
    const projects = tasks.map(task => task.project);

    const ids = projects.map(({ id }) => id);
    const filtered = projects.filter(({ id }, index) =>
    !ids.includes(id, index + 1));

    return filtered;
  }

    async remove(id: number) {
    return this.prisma.project.delete({
      where: {id}
    });
  }
}

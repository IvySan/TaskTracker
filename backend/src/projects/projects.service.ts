import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma:PrismaService
 ) {}

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

  // async update(projectId: number, data : {taskId : number}) {
  //   const {taskId} = data;

  //   const task = await this.prisma.task.findUnique({
  //     where : {
  //       id : taskId
  //     }
  //   });

  //   if (!task){
  //     return {
  //       mesage : "Task doesn't exist",
  //       edited : false
  //     }
  //   }

  //   const tasks = await this.prisma.task.findMany({
  //     where : {
  //       taskId
  //     }
  //   })

  //   if (relations[0]){
  //     return {
  //       message : 'Relation already Exist',
  //       edited: false
  //     }
  //   }

  //   return this.prisma.userTask.create({
  //     data: {
  //       taskId,
  //       userId
  //     }, 
  //   })
  // }
  


  async remove(id: number) {
    return this.prisma.project.delete({
      where: {id}
    });
  }
}

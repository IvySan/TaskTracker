import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(
    private prisma:PrismaService
 ) {}

  //jednina jer je model u jednini(Task) Prisma.TaskCreateInput
  //samo kreira task
  // create(createTaskDto: Prisma.TaskCreateInput) {
  //   return this.prisma.task.create({
  //     data:createTaskDto
  //   });
  // }

  //kreira i task i dodeljuje mu projekat u okviru kog ce da bude
  async create(createTaskDto: Prisma.TaskUncheckedCreateInput) {
    return this.prisma.task.create({
      data:createTaskDto
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include:{
        project: true,
        users:true
      }
    });
  }

  //ista kao funkcija findOne(id:number)
  async findOne(taskWhereUniqueInput: Prisma.TaskWhereUniqueInput) {
    return this.prisma.task.findUnique({
          where: taskWhereUniqueInput,
          include:{
            project:true,
            users:true
          }
    });
  }

  // findOne(id: number) {
  //   return this.prisma.task.findUnique({
  //         where:{id}
  //   });
  // }

  async update(where:Prisma.TaskWhereUniqueInput, data: Prisma.TaskUpdateInput) {
    return this.prisma.task.update({
      where,
      data
    });
  }

  // update(id:number, updateTaskDto: Prisma.TaskUpdateInput) {
  //   return this.prisma.task.update({
  //     where:{id},
  //     data:updateTaskDto
  //   });
  // }

  async remove(where:Prisma.TaskWhereUniqueInput) {
    return this.prisma.task.delete({
      where
    });
  }

//   remove(id: number) {
//     return this.prisma.task.delete({
//       where: {id}
//     });
//  }

}

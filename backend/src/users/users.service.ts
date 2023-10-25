
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, UserTask } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma : PrismaService  
  ) {}

  async create(createUserDto: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({
      data:createUserDto,
    });
  }

  //getUsers
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        tasks: {
          include : {
            task : true
          }
        }
    },
    });
  }
  //getUser
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where:{id},
      include:{
        tasks:true
      }
    });
  }

  async updateUserInfo(id: number, updateUserDto: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.update({
          where:{id},
          data:updateUserDto
        });
  }

  async update(userId: number, data : {taskId : number}) {
    const {taskId} = data;

    const task = await this.prisma.task.findUnique({
      where : {
        id : taskId
      }
    });

    if (!task){
      return {
        mesage : "Task doesn't exist",
        edited : false
      }
    }

    const relations = await this.prisma.userTask.findMany({
      where : {
        taskId,
        userId
      }
    })

    if (relations[0]){
      return {
        message : 'Relation already Exist',
        edited: false
      }
    }

    return this.prisma.userTask.create({
      data: {
        taskId,
        userId
      }, 
    })
  }

  //brise samo usera
  // async remove(id: number) {
  //   return this.prisma.user.delete({
  //          where: {id}
  //   });
  // }

  //brise usera i povezane taskove
  async remove(id: number) {

    const deleteTasks = this.prisma.userTask.deleteMany({
      where: {userId : id}
    })
    
    const deleteUser = this.prisma.user.delete({
      where: {id}
    })
    
    return await this.prisma.$transaction([deleteTasks, deleteUser])
    
  }


}

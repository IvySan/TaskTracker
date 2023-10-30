import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, UserTask } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserUncheckedCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Post('/addTimeOnTask')
  updateTimeOnTask(@Body() data: {userId : number, taskId: number, time : string, date: string}) {
    return this.usersService.updateTimeOnTask(data);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('time/:userId')
  getTimesForUserAndTask(@Param('userId') userId: number){
    return this.usersService.getTimesForUserAndTask(+userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  updateUserInfo(@Param('id') id:number, @Body() updateUserDto: Prisma.UserUncheckedUpdateInput) {
    return this.usersService.updateUserInfo(+id, updateUserDto);
  }
  
  @Put(':id/addTask')
  update(@Param('id') id: string, @Body() data : {taskId : number} ) {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Delete(':id/removeTask')
  removeTaskFromUser(@Param('id') id: string, @Body() data : {taskId : number}){
    return this.usersService.removeTaskFromUser(+id, data)
  }
}

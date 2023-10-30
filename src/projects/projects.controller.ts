import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';

import { Prisma } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto:Prisma.ProjectCreateInput) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Get(':userId/getProjectsForUser')
  getProjectsForUser(@Param('userId') userId: string) {
    return this.projectsService.findProjectsForUser(+userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: Prisma.ProjectUncheckedUpdateInput) {
    return this.projectsService.updateProjectInfo(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}

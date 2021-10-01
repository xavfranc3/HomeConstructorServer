import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import RequestWithUser from '../auth/requestWithUser.interface';
import { UpdateProjectDto } from './dto/update-project.dto';
import { EmailConfirmationGuard } from '../email-confirmation/guards/emailConfirmation.guard';

@Controller('project')
@UseGuards(EmailConfirmationGuard)
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(
    @Body() project: CreateProjectDto,
    @Req() req: RequestWithUser,
  ) {
    return this.projectService.createProject(project, req.user);
  }

  @Get()
  indexProjects(@Req() req: RequestWithUser) {
    return this.projectService.indexProjects(req.user);
  }

  @Get(':id')
  findProjectById(@Param('id') id: string) {
    return this.projectService.findProjectById(Number(id));
  }

  @Put(':id')
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(Number(id), updateProjectDto);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(Number(id));
  }
}

import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../user/entities/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  indexProjects(user) {
    return this.projectRepository.find({
      owner: user,
    });
  }

  async createProject(project: CreateProjectDto, user: User) {
    const newProject = await this.projectRepository.create({
      ...project,
      owner: user,
    });
    await this.projectRepository.save(newProject);
    return newProject;
  }

  async findProjectByName(name: string, user: User) {
    const project = await this.projectRepository.findOne({
      name: name,
      owner: user,
    });
    if (project) {
      return project;
    }
    throw new HttpException(
      'you have no project by this name',
      HttpStatus.NOT_FOUND,
    );
  }
  async findProjectById(id: number) {
    return await this.projectRepository.findOne(id);
  }

  async updateProject(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findProjectById(id);
    if (project) {
      const updatedProject = await this.projectRepository.merge(
        project,
        updateProjectDto,
      );
      await updatedProject.save();
      return updatedProject;
    }
    throw new HttpException('Project does not exist', HttpStatus.NOT_FOUND);
  }

  async deleteProject(id) {
    return this.projectRepository.delete(id);
  }
}

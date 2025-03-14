import { describe, it, expect, beforeEach } from 'vitest';
import ProjectService from './projectService';
import Project from '../models/project';
import Activity from '../models/activity';

describe('ProjectService', () => {
	let projectService;

	beforeEach(() => {
		projectService = new ProjectService();
	});

	describe('createProject', () => {
		it('should create a new project with valid data and assign incremental id', () => {
			const project1 = projectService.createProject(
				'Projeto 1',
				'2023-01-01',
				'2023-12-31',
			);
			const project2 = projectService.createProject(
				'Projeto 2',
				'2023-02-01',
				'2023-11-30',
			);

			expect(project1).toBeInstanceOf(Project);
			expect(project1.id).toBe(1);
			expect(project1.name).toBe('Projeto 1');
			expect(project1.startDate).toBe('2023-01-01');
			expect(project1.endDate).toBe('2023-12-31');

			expect(project2.id).toBe(2);
			expect(projectService.projects.length).toBe(2);
		});

		it('should initialize projects with empty activities array', () => {
			const project = projectService.createProject(
				'Projeto teste',
				'2023-01-01',
				'2023-12-31',
			);

			expect(project.activities).toEqual([]);
			expect(project.completionPercentage).toBe(0);
		});
	});

	describe('createActivity', () => {
		it('should create a new activity and add it to the project', () => {
			const project = projectService.createProject(
				'Projeto teste',
				'2023-01-01',
				'2023-12-31',
			);

			const activity = projectService.createActivity(
				project.id,
				'Atividade teste',
				'2023-02-01',
				'2023-03-01',
				false,
			);

			expect(activity).toBeInstanceOf(Activity);
			expect(activity.id).toBe(1);
			expect(activity.projectId).toBe(project.id);
			expect(activity.name).toBe('Atividade teste');
			expect(activity.startDate).toBe('2023-02-01');
			expect(activity.endDate).toBe('2023-03-01');
			expect(activity.completed).toBe(false);

			expect(projectService.activities.length).toBe(1);
			expect(project.activities).toContain(activity);
		});

		it('should throw an error when creating an activity for non-existent project', () => {
			expect(() => {
				projectService.createActivity(
					999,
					'Atividade teste',
					'2023-02-01',
					'2023-03-01',
					false,
				);
			}).toThrow('Project not found');
		});

		it('should update project completion percentage when adding an activity', () => {
			const project = projectService.createProject(
				'Projeto teste',
				'2023-01-01',
				'2023-12-31',
			);

			projectService.createActivity(
				project.id,
				'Atividade 1',
				'2023-02-01',
				'2023-03-01',
				false,
			);
			projectService.createActivity(
				project.id,
				'Atividade 2',
				'2023-04-01',
				'2023-05-01',
				true,
			);

			expect(project.completionPercentage).toBe(50);
		});

		it('should assign incremental IDs to activities', () => {
			const project = projectService.createProject(
				'Projeto teste',
				'2023 -01-01',
				'2023-12-31',
			);

			const activity1 = projectService.createActivity(
				project.id,
				'Atividade 1',
				'2023-02-01',
				'2023-03-01',
				false,
			);
			const activity2 = projectService.createActivity(
				project.id,
				'Atividade 2',
				'2023-04-01',
				'2023-05-01',
				true,
			);

			expect(activity1.id).toBe(1);
			expect(activity2.id).toBe(2);
		});
	});

	describe('updateActivity', () => {
		it('should update an existing activity', () => {
			const project = projectService.createProject(
				'Projeto teste',
				'2023-01-01',
				'2023-12-31',
			);
			const activity = projectService.createActivity(
				project.id,
				'Atividade 1',
				'2023-02-01',
				'2023-03-01',
				false,
			);

			const updatedActivity = projectService.updateActivity(
				activity.id,
				project.id,
				'Atualiza Atividade',
				'2023-02-01',
				'2023-04-01',
				true,
			);

			expect(updatedActivity.name).toBe('Atualiza Atividade');
			expect(updatedActivity.endDate).toBe('2023-04-01');
			expect(updatedActivity.completed).toBe(true);
		});

		it('should throw an error when updating a non-existent activity', () => {
			expect(() => {
				projectService.updateActivity(
					999,
					1,
					'Atividade inexistente',
					'2023-02-01',
					'2023-03-01',
					false,
				);
			}).toThrow('Activity not found');
		});

		it('should update the project completion percentage when an activity is updated', () => {
			const project = projectService.createProject(
				'Projeto teste',
				'2023-01-01',
				'2023-12-31',
			);
			projectService.createActivity(
				project.id,
				'Atividade 1',
				'2023-02-01',
				'2023-03-01',
				true,
			);
			const activity = projectService.createActivity(
				project.id,
				'Atividade 2',
				'2023-04-01',
				'2023-05-01',
				false,
			);

			expect(project.completionPercentage).toBe(50);

			projectService.updateActivity(
				activity.id,
				project.id,
				'Atividade 2',
				'2023-04-01',
				'2023-05-01',
				true,
			);

			expect(project.completionPercentage).toBe(100);
		});
	});

	describe('getProjects', () => {
		it('should return an array of projects', () => {
			const project1 = projectService.createProject(
				'Projeto 1',
				'2023-01-01',
				'2023-12-31',
			);
			const project2 = projectService.createProject(
				'Projeto 2',
				'2023-02-01',
				'2023-11-30',
			);

			const projects = projectService.getProjects();

			expect(projects).toContain(project1);
			expect(projects).toContain(project2);
			expect(projects.length).toBe(2);
		});
	});
});

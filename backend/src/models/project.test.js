import { describe, it, expect, beforeEach } from 'vitest';
import Project from './project';

describe('Project Model', () => {
	let project;
	let mockActivities;

	beforeEach(() => {
		project = new Project('123', 'Test Project', '2023-01-01', '2023-12-31');

		mockActivities = [
			{ id: '1', name: 'Task 1', endDate: '2023-06-15', completed: false },
			{ id: '2', name: 'Task 2', endDate: '2023-07-20', completed: true },
			{ id: '3', name: 'Task 3', endDate: '2023-11-10', completed: false },
			{ id: '4', name: 'Task 4', endDate: '2024-01-15', completed: false }, // After project endDate
		];
	});

	it('should create a new project with valid data', () => {
		expect(project.id).toBe('123');
		expect(project.name).toBe('Test Project');
		expect(project.startDate).toBe('2023-01-01');
		expect(project.endDate).toBe('2023-12-31');
		expect(project.activities).toEqual([]);
		expect(project.completionPercentage).toBe(0);
	});

	it('should add an activity to the project', () => {
		const activity = mockActivities[0];
		project.addActivity(activity);

		expect(project.activities).toHaveLength(1);
		expect(project.activities[0]).toEqual(activity);
	});

	it('should update completion percentage when adding activities', () => {
		project.addActivity(mockActivities[0]);
		expect(project.completionPercentage).toBe(0);

		project.addActivity(mockActivities[1]);
		expect(project.completionPercentage).toBe(50);

		project.addActivity(mockActivities[2]);
		expect(project.completionPercentage).toBe(33.33333333333333);
	});

	it('should keep completion percentage at 0 when there are no activities', () => {
		project.updateCompletionPercentage();
		expect(project.completionPercentage).toBe(0);
	});

	it('should calculate completion percentage correctly', () => {
		mockActivities.forEach((activity) => project.addActivity(activity));

		expect(project.completionPercentage).toBe(25);

		project.activities[0].completed = true;
		project.updateCompletionPercentage();

		expect(project.completionPercentage).toBe(50);
	});

	it('should detect if the project is delayed (has activities past endDate)', () => {
		project.addActivity(mockActivities[0]);
		project.addActivity(mockActivities[1]);
		project.addActivity(mockActivities[2]);

		expect(project.delayed).toBe(false);

		project.addActivity(mockActivities[3]);

		expect(project.delayed).toBe(true);
	});

	it('should not be delayed if all activities are within the project timeline', () => {
		project.addActivity(mockActivities[0]);
		project.addActivity(mockActivities[1]);
		project.addActivity(mockActivities[2]);

		expect(project.delayed).toBe(false);
	});
});

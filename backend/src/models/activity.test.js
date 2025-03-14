import { describe, it, expect, beforeEach } from 'vitest';
import Activity from './activity';

describe('Activity Model', () => {
	let activity;
	let activityData;

	beforeEach(() => {
		activityData = {
			id: 123,
			projectId: 456,
			name: 'Atividade teste',
			startDate: '2023-06-01',
			endDate: '2023-06-15',
			completed: false,
		};

		activity = new Activity(
			activityData.id,
			activityData.projectId,
			activityData.name,
			activityData.startDate,
			activityData.endDate,
			activityData.completed,
		);
	});

	it('should create a new activity with valid data', () => {
		expect(activity.id).toBe(activityData.id);
		expect(activity.projectId).toBe(activityData.projectId);
		expect(activity.name).toBe(activityData.name);
		expect(activity.startDate).toBe(activityData.startDate);
		expect(activity.endDate).toBe(activityData.endDate);
		expect(activity.completed).toBe(activityData.completed);
	});

	it('should create an activity with numeric IDs', () => {
		expect(typeof activity.id).toBe('number');
		expect(typeof activity.projectId).toBe('number');
	});

	it('should allow completion status to be toggled', () => {
		expect(activity.completed).toBe(false);

		activity.completed = true;
		expect(activity.completed).toBe(true);
	});

	it('should identify if the activity is overdue based on end date', () => {
		const isActivityOverdue = (activity) => {
			const currentDate = new Date();
			const endDate = new Date(activity.endDate);
			return !activity.completed && endDate < currentDate;
		};

		const pastDate = new Date();
		pastDate.setDate(pastDate.getDate() - 10);

		const overdueActivity = new Activity(
			789,
			456,
			'Atividade atrasada',
			'2023-01-01',
			pastDate.toISOString().split('T')[0],
			false,
		);

		expect(isActivityOverdue(overdueActivity)).toBe(true);

		overdueActivity.completed = true;
		expect(isActivityOverdue(overdueActivity)).toBe(false);

		const futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 10);

		const upcomingActivity = new Activity(
			888,
			456,
			'Atividade futura',
			'2023-01-01',
			futureDate.toISOString().split('T')[0],
			false,
		);

		expect(isActivityOverdue(upcomingActivity)).toBe(false);
	});
});

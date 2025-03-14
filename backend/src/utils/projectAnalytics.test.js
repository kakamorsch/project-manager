import { describe, it, expect } from 'vitest';
import projectAnalytics from './projectAnalytics';

describe('Project Analytics Utils', () => {
  describe('applyDelayLogic', () => {
    it('should mark a project as delayed when any activity has an end date after the project end date', () => {
      // Arrange
      const projects = [
        {
          id: 1,
          name: 'Projeto teste',
          startDate: '2023-01-01',
          endDate: '2023-12-31',
          activities: [
            { id: 1, name: 'Atividade dentro do prazo', endDate: '2023-10-15', completed: false },
            { id: 2, name: 'Atividade atrasada', endDate: '2024-01-15', completed: false }
          ]
        }
      ];

      // Act
      const result = projectAnalytics.applyDelayLogic(projects);

      // Assert
      expect(result[0].delayed).toBe(true);
    });

    it('should not mark a project as delayed when all activities end before project end date', () => {
      const projects = [
        {
          id: 1,
          name: 'Projeto dentro do prazo',
          startDate: '2023-01-01',
          endDate: '2023-12-31',
          activities: [
            { id: 1, name: 'Atividade 1', endDate: '2023-06-15', completed: false },
            { id: 2, name: 'Atividade 2', endDate: '2023-11-30', completed: false }
          ]
        }
      ];

      const result = projectAnalytics.applyDelayLogic(projects);

      expect(result[0].delayed).toBe(false);
    });

    it('should handle projects with no activities and mark them as not delayed', () => {
      const projects = [
        {
          id: 1,
          name: 'Projeto vazio',
          startDate: '2023-01-01',
          endDate: '2023-12-31',
          activities: []
        }
      ];

      const result = projectAnalytics.applyDelayLogic(projects);

      expect(result[0].delayed).toBe(false);
    });

    it('should handle multiple projects correctly', () => {
      const projects = [
        {
          id: 1,
          name: 'Projeto atrasado',
          startDate: '2023-01-01',
          endDate: '2023-06-30',
          activities: [
            { id: 1, name: 'Atividade 1', endDate: '2023-05-15', completed: false },
            { id: 2, name: 'Atividade 2', endDate: '2023-07-15', completed: false } // Delayed
          ]
        },
        {
          id: 2,
          name: 'Projeto dentro do prazo',
          startDate: '2023-01-01',
          endDate: '2023-12-31',
          activities: [
            { id: 3, name: 'Atividade 3', endDate: '2023-10-15', completed: false },
            { id: 4, name: 'Atividade 4', endDate: '2023-11-30', completed: true }
          ]
        }
      ];

      const result = projectAnalytics.applyDelayLogic(projects);

      expect(result[0].delayed).toBe(true);
      expect(result[1].delayed).toBe(false);
    });

    it('should still mark a project as delayed even if delayed activity is completed', () => {
      const projects = [
        {
          id: 1, name: 'Projeto concluído com atraso',
          startDate: '2023-01-01',
          endDate: '2023-06-30',
          activities: [
            { id: 1, name: 'Atividade 1', endDate: '2023-05-15', completed: true },
            { id: 2, name: 'Atividade 2', endDate: '2023-07-15', completed: false } // Delayed
          ]
        }
      ];

      const result = projectAnalytics.applyDelayLogic(projects);

      expect(result[0].delayed).toBe(true);
    });
  });
});

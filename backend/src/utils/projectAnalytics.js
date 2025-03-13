function applyDelayLogic(projects) {
    return projects.map(project => {
      const projectDueDate = new Date(project.endDate);
      const delayed = project.activities.some(activity => {
        const activityEndDate = new Date(activity.endDate);
        return activityEndDate > projectDueDate;
      });
      return {
        ...project,
        delayed,
      };
    });
  }

  export default {
    applyDelayLogic,
  };

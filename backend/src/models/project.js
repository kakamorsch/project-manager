class Project {
  constructor(id, name, startDate, endDate) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.activities = [];
    this.completionPercentage = 0;
  }

  addActivity(activity) {
    this.activities.push(activity);
    this.updateCompletionPercentage();
  }

  updateCompletionPercentage() {
    const totalActivities = this.activities.length;
    if (totalActivities === 0) {
      this.completionPercentage = 0;
      return;
    }
    const completedActivities = this.activities.filter(
      activity => activity.completed
    ).length;
    this.completionPercentage = (completedActivities / totalActivities) * 100;
  }

  get delayed() {
    const projectDueDate = new Date(this.endDate);
    return this.activities.some(activity => {
      const activityEndDate = new Date(activity.endDate);
      return activityEndDate > projectDueDate;
    });
  }
}

export default Project;

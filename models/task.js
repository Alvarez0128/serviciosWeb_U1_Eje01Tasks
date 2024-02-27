class Task {
    constructor(id, title, description = '', completed = false, createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
    }

    static countTasks(tasks) {
        return tasks.length;
    }

    static isEmpty(tasks) {
        return tasks.length === 0;
    }

    static existTitle(title) {
        return title && title.trim().length > 0 && typeof title === 'string';
    }

    static isParamsValid(title, description, completed) {
        return title && typeof title === 'string' && description && typeof description === 'string' && completed && typeof completed === 'boolean'
    }
    
    static getTaskById(tasks, id) {
        return tasks.find(task => task.id === parseInt(id));
    }
    
    static countTaskStatus(tasks) {
        return tasks.reduce((statusCounts, task) => {
            if (task.completed) {
                statusCounts.completed++;
            } else {
                statusCounts.uncompleted++;
            }
            return statusCounts;
        }, {completed: 0, uncompleted: 0});
    }

    static recentTask(tasks) {
        return tasks.reduce((recentTaskTrack, currentTask) => {
            return recentTaskTrack.createdAt > currentTask.createdAt ? currentTask : recentTaskTrack;
        }, tasks[0]);
    }

    static oldestTask(tasks) {
        return tasks.reduce((oldestTaskTrack, currentTask) => {
            return oldestTaskTrack.createdAt < currentTask.createdAt ? currentTask : oldestTaskTrack;
        }, tasks[0]);
    }

}

module.exports = Task;

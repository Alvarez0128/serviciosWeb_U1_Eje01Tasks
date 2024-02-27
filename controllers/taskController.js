const Task = require('../models/task');
const {json} = require("express");
let tasks = [
    {
        id: 1,
        title: 'Tarea 1',
        description: 'Descripcion de la tarea 1',
    },
    {
        id: 2,
        title: 'Tarea 2',
        description: 'Descripcion de la tarea 2',
    },
    {
        id: 3,
        title: 'Tarea 3',
        description: 'Descripcion de la tarea 3',
    }
]

function getAllTasks() {
    try {
        if (Task.isEmpty(tasks)) {
            return {status: 404, message: 'No existen tareas creadas'};
        } else {
            return {status: 200, data: tasks};
        }
    } catch (error) {
        console.error('Error:', error);
        return {status: 500, message: 'Internal server error'};
    }
}


function createTask(title, description) {
    try {
        if (!Task.existTitle(title)) {
            return {status: 400, message: 'Se requiere un titulo'};
        } else {
            const newTask = new Task(tasks.length + 1, title, description);
            tasks.push(newTask);
            return {status: 200, data: newTask};
        }
    } catch (error) {
        console.error('Error:', error);
        return {status: 500, message: 'Internal server error'};
    }
}


function getNumberOfTasks() {
    try {
        if (Task.isEmpty(tasks)) {
            return {status: 404, message: 'No existen tareas creadas'};
        } else {
            return {status: 200, count: Task.countTasks(tasks)};
        }
    } catch (error) {
        console.error('Error:', error);
        return {status: 500, message: 'Internal server error'};
    }
}


function getTasksByStatus() {
    try {
        if (Task.isEmpty(tasks)) {
            return {
                status: 404,
                message: 'No existen tareas creadas'
            };
        } else {
            return {status: 200, TaskByStatus: Task.countTaskStatus(tasks)};
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            status: 500,
            message: 'Internal server error.'
        };
    }
}


function getRecentTask() {
    try {
        if (Task.isEmpty(tasks)) {
            return {status: 404, message: 'No existen tareas creadas'};
        } else {
            return {status: 200, RecentTask: Task.recentTask(tasks)}
        }
    } catch (error) {
        console.error('Error:', error);
        return {status: 500, message: 'Internal server error'};
    }
}


function getOldestTask() {
    try {
        if (Task.isEmpty(tasks)) {
            return {status: 404, message: 'No existen tareas creadas'};
        } else {
            return {status: 200, OldestTask: Task.oldestTask(tasks)};
        }
    } catch (error) {
        console.error('Error:', error);
        return {status: 500, message: 'Internal server error'};
    }
}


function getTaskById(id) {
    try {
        const task = Task.getTaskById(tasks, id);
        if (!task) {
            return {status: 404, message: `La tarea con id: ${id} no fue encontrada`};
        } else {
            return {status: 200, taskById: task};
        }
    } catch (error) {
        console.error('Error:', error);
        return {status: 500, message: 'Internal server error'};
    }
}


function updateTaskById(id, title, description, completed) {
    try {
        const task = Task.getTaskById(tasks, id);

        if (!task) {
            return {status: 404, message: `La tarea con id: ${id} no fue encontrada`};
        }

        if (!Task.isParamsValid(title, description, completed)) {
            return {
                status: 400,
                message: 'Error: los parámetros no son válidos, faltan o están vacíos.'
            };
        }

        task.title = title;
        task.description = description;
        task.completed = completed;
        return {status: 200, taskUpdated: task};
    } catch (error) {
        console.error('Error:', error);
        return {status: 500, message: 'Internal server error'};
    }
}


function deleteTaskById(id) {
    try {
        const task = Task.getTaskById(tasks, id);

        if (!task) {
            return {status: 404, message: `La tarea con id: ${id} no fue encontrada`};
        } else {
            tasks = tasks.filter(task => task.id !== parseInt(id));
            return {status: 200, deletedTask: task};
        }
    } catch (error) {
        console.error('Error:', error);
        return {status: 500, message: 'Internal server error'};
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getNumberOfTasks,
    getTasksByStatus,
    getRecentTask,
    getOldestTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
}
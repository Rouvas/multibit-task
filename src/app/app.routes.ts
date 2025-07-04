import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks')
      .then(c => c.Tasks)
  },
  {
    path: 'tasks/new',
    loadComponent: () => import('./pages/task-form/task-form')
      .then(c => c.TaskForm)
  },
  {
    path: 'tasks/:id',
    loadComponent: () => import('./pages/task/task')
      .then(c => c.Task)
  },
  {
    path: 'tasks/:id/edit',
    loadComponent: () => import('./pages/task-form/task-form')
      .then(c => c.TaskForm)
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];

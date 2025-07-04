import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {db} from '../../shared/ulitities/db';
import {AsyncPipe, NgClass} from '@angular/common';
import { Task as ITask } from '../../shared/interfaces/task';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-task',
  imports: [
    AsyncPipe,
    NgClass,
    RouterLink
  ],
  templateUrl: './task.html',
  standalone: true,
  styleUrl: './task.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task {

  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  // Не лучшая практика, но для демонстрации, думаю, подойдет (вообще идеально вынести в сервис)
  private task = new BehaviorSubject<ITask | null>(null);
  task$ = this.task.asObservable();
  private state = new BehaviorSubject<'loading' | 'view' | 'error'>('loading')
  state$ = this.state.asObservable();

  constructor() {
    this._route.params.subscribe(params => {
      this.state.next('loading');
      const id = params['id'];
      if (!id) {
        this.state.next('error');
      } else {
        this.getTask(id)
          .then(task => {
            if (task) {
              this.task.next(task);
              this.state.next('view');
            } else {
              this.state.next('error');
            }
          })
      }
    })
  }

  getTask(id: number) {
    if (!id) throw new Error('Id задачи не найдено');
    return db.tasks.get(Number(id));
  }

  async removeTask(id?: number) {
    if (!id) throw new Error('Id задачи не найдено');
    await db.tasks.delete(id);
    await this._router.navigateByUrl('/');
  }

}

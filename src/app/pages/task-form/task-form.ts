import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {db} from '../../shared/ulitities/db';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './task-form.html',
  standalone: true,
  styleUrl: './task-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskForm {

  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private id = new BehaviorSubject<number | null>(null);
  id$ = this.id.asObservable();

  constructor() {
    this._route.params.subscribe(params => {
      this.getTask(Number(params['id']))
        .then(task => {
          if (task) {
            this.taskForm.patchValue(task);
            this.id.next(Number(task.id));
          }
        })
    })
  }

  taskForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required]}),
    description: new FormControl<string | null>(null),
    status: new FormControl<boolean>(false, { nonNullable: true }),
  })

  getTask(id?: number) {
    if (!id) throw new Error( 'Id задачи не найдено');
    return db.tasks.get(id);
  }

  async saveTask() {
    const id = this.id.getValue();

    if (id) {
      await db.tasks.update(id, this.taskForm.getRawValue());
      await this._router.navigate(['..']);
    } else {
      await db.tasks.add(this.taskForm.getRawValue());
      await this._router.navigate(['..']);
    }
  }

}

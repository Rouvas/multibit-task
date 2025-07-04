import {Component, Input} from '@angular/core';
import {Task} from '../../../../shared/interfaces/task';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {db} from '../../../../shared/ulitities/db';
import {idToString} from '../../../../shared/ulitities/idToString';

@Component({
  selector: 'app-task-card',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './task-card.html',
  standalone: true,
  styleUrl: './task-card.scss'
})
export class TaskCard {

  @Input({required: true}) task!: Task;

  removeTask(id?: number) {
    if (!id) throw new Error( 'Id задачи не найдено');
    db.tasks.delete(id);
  }

  protected readonly idToString = idToString;
}

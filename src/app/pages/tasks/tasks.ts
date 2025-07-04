import {ChangeDetectionStrategy, Component} from '@angular/core';
import {liveQuery} from 'dexie';
import {db} from '../../shared/ulitities/db';
import {AsyncPipe} from '@angular/common';
import {TaskCard} from './components/task-card/task-card';


@Component({
  selector: 'app-tasks',
  imports: [
    AsyncPipe,
    TaskCard
  ],
  templateUrl: './tasks.html',
  standalone: true,
  styleUrl: './tasks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tasks {
  tasks$ = liveQuery(() => db.tasks.toArray());
}

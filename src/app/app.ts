import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './static/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'multibit-task';
}

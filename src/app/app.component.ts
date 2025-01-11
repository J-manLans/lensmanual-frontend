import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LensManualComponent } from './lens-manual/lens-manual.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LensManualComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}

import { Component } from '@angular/core';
import { LensesComponent } from "../lenses/lenses.component";

@Component({
  selector: 'app-admin',
  imports: [LensesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}

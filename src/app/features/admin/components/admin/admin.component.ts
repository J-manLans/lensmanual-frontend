import { Component } from '@angular/core';
import { LensesComponent } from "../lenses/lenses.component";
import { RouterModule } from '@angular/router';
import { DiameterStrengthBoundsComponent } from "../diameter-strength-bounds/diameter-strength-bounds.component";
import { IndexesComponent } from "../indexes/indexes.component";

@Component({
  selector: 'app-admin',
  imports: [RouterModule, LensesComponent, DiameterStrengthBoundsComponent, IndexesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}

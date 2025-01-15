import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Index } from '../../../../models/Index';
import { BackendService } from '../../../../services/backend.service';

@Component({
  selector: 'app-indexes',
  imports: [CommonModule],
  templateUrl: './indexes.component.html',
  styleUrl: './indexes.component.css'
})
export class IndexesComponent {
  indexes: Index[] = []
  backendService: BackendService = inject(BackendService)

  ngOnInit() {
    this.loadIndexes()
  }

  /*======================================
  Server Methods
  ======================================*/

  /* ===== Load all indexes ===== */

  loadIndexes() {
    this.backendService.getAllIndexes().subscribe({
      next: (index: Index[]) => {
        this.indexes = index
      },
      error: (error) => {
        console.error(`An error occurred when getting indexes from the api: ${error.message}`)
      }
    })
  }
}

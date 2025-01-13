import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lense } from '../../../../models/lens';
import { BackendService } from '../../../../services/backend.service';

@Component({
  selector: 'app-lenses',
  imports: [CommonModule],
  templateUrl: './lenses.component.html',
  styleUrl: './lenses.component.css'
})
export class LensesComponent {
  lenses: Lense[] = []
  backendService: BackendService = inject(BackendService)


  ngOnInit(): void {
    this.loadLenses()
  }

  loadLenses(): void {
    this.backendService.getAllLenses().subscribe({
      next: (lenses: Lense[]) => {
        this.lenses = lenses

        this.lenses.sort((a, b) => {
          const typeComp = a.type.localeCompare(b.type)
          if (typeComp !== 0) {
            return typeComp
          }
          return b.quality - a.quality
        })

        this.extractIndexPrices()
      },
      error: (error) => {
        console.error(`An error occurred when getting lenses from the api: ${error.message}`);
      }
    })
  }

  extractIndexPrices(): void {
    this.lenses.forEach(lense => {
      lense.indexPrices = lense.indexData
      .map((indexData) => {
        const price = indexData.price
        const index = indexData.diameterStrengthBounds
          .map(dsb => dsb.index)
          return `${index}: ${price}`
      }).join(', ')
    });
  }

  deleteLens(lensName: string, quality: number) {
    this.backendService.deleteLense(lensName, quality).subscribe({
      next: (lense) => {
        console.log(`Linsen ${lense.name} togs bort.`);
        this.loadLenses();
      },
      error: (error) => {
        console.error(`An error occurred when deleting lense ${lensName}: ${error.message}`);
      }
    });
  }
}

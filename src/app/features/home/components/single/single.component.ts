import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedGlassInfoPrefixComponent } from "../shared-glass-info-prefix/shared-glass-info-prefix.component";
import { Lense } from '../../../../models/lens';
import { BackendService } from '../../../../services/backend.service';

@Component({
  selector: 'app-single',
  imports: [CommonModule, SharedGlassInfoPrefixComponent],
  templateUrl: './single.component.html',
  styleUrl: './single.component.css'
})
export class SingleComponent {
lenses: Lense[] = []
  lense: Lense = this.initializeVitalFieldsForLense() as Lense;
  backendService: BackendService = inject(BackendService)
  indexes = [
    { id: '1.74', label: 'Lineis', display: '1.74', value: null },
    { id: '1.67', label: 'Stylis', display: '1.67', value: null },
    { id: '1.6', label: 'Ormix', display: '1.6', value: null },
    { id: '1.5-orma', label: 'Orma', display: '1.5 (orma)', value: null },
    { id: '1.5-organic', label: 'Organic', display: '1.5 (organic)', value: null },
  ]

  ngOnInit() {
    this.loadLenses()
  }

  /*======================================
    Server Methods
  ======================================*/

  /* ===== Load all lenses ===== */

  private loadLenses() {
    this.backendService.getAllLenses().subscribe({
      next: (lenses: Lense[]) => {
        this.lenses = lenses

        this.sortLenses()
        this.extractIndexPrices()
      },
      error: (error) => {
        console.error(`An error occurred when getting lenses from the api: ${error.message}`);
      }
    })
  }

  private sortLenses() {
    this.lenses.sort((a, b) => {
      const typeComp = a.type.localeCompare(b.type)
      if (typeComp !== 0) {
        return typeComp
      }
      return b.quality - a.quality
    })
  }

  private extractIndexPrices() {
    this.lenses.forEach(lense => {
      lense.indexPrices = lense.indexData
      .map((indexData) => {
        const price = indexData.price

        if (indexData.diameterStrengthBounds === null) {
          const indexId = this.indexes.find(index => index.label === indexData.name)!.id;
          return `${indexId}: ${price}`
        }

        const index = indexData.diameterStrengthBounds.map(dsb => dsb.index)
          return `${index}: ${price}`
      }).join(', ')
    });
  }


  private initializeVitalFieldsForLense(): Object {
    return {
      treatment: [],
      staticCorrectionDetails: {
        prism: null,
        addition: { min: null, max: null }
      },
      indexData: [
        {
          price: null,
          diameterStrengthBounds: []
        }
      ]
    }
  }
}

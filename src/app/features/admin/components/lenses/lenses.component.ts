import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lense } from '../../../../models/lens';
import { BackendService } from '../../../../services/backend.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lenses',
  imports: [CommonModule, FormsModule],
  templateUrl: './lenses.component.html',
  styleUrl: './lenses.component.css'
})
export class LensesComponent {
  lenses: Lense[] = []
  lense: Lense = this.initializeVitalFieldsForLense() as Lense;
  backendService: BackendService = inject(BackendService)
  orgLensName: string = '';
  orgQuality: number = 0;
  submitted: boolean = false;
  indices = [
    { id: '1.74', label: 'Lineis', display: '1.74', value: null },
    { id: '1.67', label: 'Stylis', display: '1.67', value: null },
    { id: '1.6', label: 'Ormix', display: '1.6', value: null },
    { id: '1.5-orma', label: 'Orma', display: '1.5 (orma)', value: null },
    { id: '1.5-organic', label: 'Organic', display: '1.5 (organic)', value: null },
  ];

  ngOnInit(): void {
    this.loadLenses()
  }

  /*======================================
    Server Methods
  ======================================*/

  private loadLenses(): void {
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

  private extractIndexPrices(): void {
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

  private loadLense(lensName: string, quality: number) {
    this.backendService.getLense(lensName, quality).subscribe({
      next: (lense) => {
        this.lense = lense
      },
      error: (error) => {
        console.error(`An error occurred when fetching lense ${lensName}: ${error.message}`);
      }
    })
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

  private editLense(lensName: string, quality: number, body: Object) {
    this.backendService.updateLense(lensName, quality, body).subscribe({
      next: (lense) => {
        console.log(`Linsen ${lense.name} ändrades.`);
        this.loadLenses();
      },
      error: (error) => {
        console.error(`An error occurred when editing lense ${lensName}: ${error.message}`);
      }
    });
  }

  /*======================================
    Component Methods
  ======================================*/

  private initializeVitalFieldsForLense(): Object {
    return {
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

  openModal(modal: HTMLDialogElement, lensName: string, quality: number): void;
  openModal(modal: HTMLDialogElement, lensName?: string, quality?: number): void;

  openModal(modal: HTMLDialogElement, lensName: string, quality: number ): void {
    if (lensName && quality) {  // For the edit modal
      // Save the composite key for changing the correct lense in case name
      // or quality will be edited
      this.orgLensName = lensName
      this.orgQuality = quality

      this.loadLense(lensName, quality)
    }

    modal.showModal()
  }

  closeModal(modal: HTMLDialogElement) {
    modal.close()
    this.lense = this.initializeVitalFieldsForLense() as Lense
  }

  updateLens(lense: Lense, modal: HTMLDialogElement) {
    this.editLense(this.orgLensName, this.orgQuality, lense)
    modal.close()
  }

  /* ===== Add form methods ===== */

  addLens(form: any): void {
    this.submitted = true
    console.log('Hurray');
  }

  hasAtLeastOneIndexValue(): boolean {
    return this.indices.some(index => index.value != null && index.value !== '');
  }
}



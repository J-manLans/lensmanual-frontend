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
  backendService: BackendService = inject(BackendService)
  lense: Lense = {} as Lense;
  lensName: string = '';
  quality: number = 0;

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

  editLense(lensName: string, quality: number, body: Object) {
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

  openEditModal(modal: HTMLDialogElement, lensName: string, quality: number) {
    // Save the composite key for changing the correct lense in case name
    // or quality will be edited
    this.lensName = lensName
    this.quality = quality

    this.backendService.getLense(lensName, quality).subscribe({
      next: (lense) => {
        this.lense = lense
        console.log(lense.staticCorrectionDetails.addition.min);

        modal.showModal()
      },
      error: (error) => {
        console.error(`An error occurred when fetching lense ${lensName}: ${error.message}`);
      }
    })
  }

  closeModal(modal: HTMLDialogElement) {
    modal.close()
  }

  updateLens(lense: Lense, modal: HTMLDialogElement) {
    this.editLense(this.lensName, this.quality, lense)
    modal.close()
  }

  openAddModal(modal: HTMLDialogElement) {
    modal.showModal()
  }

  addLens() {

  }
}

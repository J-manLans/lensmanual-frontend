import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lense } from '../../../../models/lens';
import { BackendService } from '../../../../services/backend.service';
import { FormsModule, NgForm } from '@angular/forms';

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
  selectedTreatment: any;
  eps: string = "";
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

  private loadLenses() {
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
    this.backendService.editLense(lensName, quality, body).subscribe({
      next: (lense) => {
        console.log(`Linsen ${lense.name} ändrades.`);
        this.loadLenses();
      },
      error: (error) => {
        console.error(`An error occurred when editing lense ${lensName}: ${error.message}`);
      }
    });
  }

  addLens(lense: any) {
    this.backendService.addLense(lense).subscribe({
      next: (lense) => {
        console.log(`Linsen ${lense.name} lades till.`);
        this.loadLenses();
      },
      error: (error) => {
        console.error(`An error occurred when adding lense ${lense.name}: ${error.message}`);
      }
    });
  }

  /*======================================
    Component Methods
  ======================================*/

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

  closeModal(modal: HTMLDialogElement, form: NgForm): void;
  closeModal(modal: HTMLDialogElement, form?: NgForm): void;

  closeModal(modal: HTMLDialogElement, form: NgForm) {
    if (form) {
      form.reset()
    }

    modal.close()
    this.lense = this.initializeVitalFieldsForLense() as Lense
  }

  updateLens(lense: Lense, modal: HTMLDialogElement) {
    this.editLense(this.orgLensName, this.orgQuality, lense)
    modal.close()
  }

  /* ===== Add form methods ===== */

  //TODO: when adding a lens it should be added to a dimension...based on its quality and type, or i just do a manual edit in the lens diameter data here on the page!!!
  submitLens(form: NgForm) {
    console.log(this.lense);

    if (form.valid) {
      this.lense.treatment.push(this.selectedTreatment)
      if (this.eps === 'EPS') this.lense.treatment.push(this.eps)

      this.indexes.forEach((index, i) => {
        if (this.indexes[i].value !== null) {
          this.lense.indexData[i] = {
            name: index.label,
            price: index.value,
            diameterStrengthBounds: []
          };
        }
      });

      this.addLens(this.lense)

    } else {
      form.control.markAllAsTouched();
    }
  }

  hasAtLeastOneIndexValue(): boolean {
    return this.indexes.some(index => index.value !== null && index.value !== 0);
  }
}



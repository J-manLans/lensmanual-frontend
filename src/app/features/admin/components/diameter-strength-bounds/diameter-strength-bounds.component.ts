import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiameterStrengthBound } from '../../../../models/DiameterStrengthBound';
import { BackendService } from '../../../../services/backend.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-diameter-strength-bounds',
  imports: [CommonModule, FormsModule],
  templateUrl: './diameter-strength-bounds.component.html',
  styleUrl: './diameter-strength-bounds.component.css'
})
export class DiameterStrengthBoundsComponent {
  dsb: DiameterStrengthBound[] = []
  oneDsb: DiameterStrengthBound = this.initializeVitalFieldsForDsb() as DiameterStrengthBound
  backendService: BackendService = inject(BackendService)
  lensNameToAdd: string = '';

  ngOnInit() {
    this.loadAllDsb()
  }


  /*======================================
    Server Methods
  ======================================*/

  /* ===== Load all diameter strength bounds ===== */

  private loadAllDsb() {
    this.backendService.getAllDsb().subscribe({
      next: (dsb: DiameterStrengthBound[]) => {
        this.dsb = dsb

        this.sortDsb()
      },
      error: (error) => {
        console.error(`An error occurred when getting diameter strength bounds from the api: ${error.message}`);
      }
    })
  }

  private sortDsb() {
    this.dsb.sort((a, b) => {
      const typeComp = a.type.localeCompare(b.type)
      if (typeComp !== 0) {
        return typeComp
      }
      return b.quality.localeCompare(a.quality)
    })
  }

  /* ===== Load one diameter strength bound ===== */

  loadOneDsb(type: string, quality: string) {
    this.backendService.getOneDsb(type, quality).subscribe({
      next: (dsb) => {
        this.oneDsb = dsb
      },
      error: (error) => {
        console.error(`An error occurred when fetching the diameter strength bounds: ${error.message}`);
      }
    })
  }

  /* ===== Edit a diameter strength bound ===== */


  editDsb(type: string, quality: string) {
    console.log(this.oneDsb.type, this.oneDsb.quality);

    this.backendService.editDsb(this.oneDsb.type, this.oneDsb.quality, this.oneDsb).subscribe({
      next: (dsb) => {
        console.log(`Styrkeomfånget ändrades.`);
        this.loadAllDsb();
      },
      error: (error) => {
        console.error(`An error occurred when editing the strength bound: ${error.message}`);
      }
      })
  }

  /*======================================
    Component Methods
  ======================================*/

  private initializeVitalFieldsForDsb(): Object {
    return {
      type: null,
      quality: null,
      identifiers: []
    }
  }


  openModal(modal: HTMLDialogElement, type: string, quality: string) {
    this.loadOneDsb(type, quality)

    modal.showModal()
  }

  closeModal(modal: HTMLDialogElement, form: NgForm) {
    form.resetForm()
    modal.close()
    this.oneDsb = this.initializeVitalFieldsForDsb() as DiameterStrengthBound
  }

  updateDbs(modal: HTMLDialogElement, form: NgForm) {
    this.oneDsb.identifiers.push(this.lensNameToAdd)
    console.log(this.oneDsb);

    this.editDsb(this.oneDsb.type, this.oneDsb.quality)

    modal.close()
    form.resetForm()
  }
}

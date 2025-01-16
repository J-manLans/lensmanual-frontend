import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgressiveComponent } from "../progressive/progressive.component";
import { SingleComponent } from "../single/single.component";


@Component({
  selector: 'app-lens-manual',
  imports: [RouterModule, ProgressiveComponent, SingleComponent],
  templateUrl: './lens-manual.component.html',
  styleUrl: './lens-manual.component.css'
})
export class LensManualComponent implements AfterViewInit {
@ViewChild('hero') hero!: ElementRef

  ngAfterViewInit(): void {
    this.heroImages()
  }

  /**
   * Selects a random image from a predefined array of image filenames and sets it as
   * the background image of the <header> element on the page.
   *
   * The images are stored in the public folder under '/img/hero-img/'.
   * On window load, a random filename is selected from the array, and the CSS
   * `backgroundImage` property is updated to display the chosen image.
   */
  private heroImages(): void {
    const heroImages = [
      'hero-image1.jpg',
      'hero-image2.jpg',
      'hero-image3.jpg',
      'hero-image4.jpg',
      'hero-image5.jpg',
      'hero-image6.jpg',
      'hero-image7.jpg',
      'hero-image8.jpg',
      'hero-image9.jpg',
      'hero-image10.jpg',
      'hero-image11.jpg',
      'hero-image12.jpg',
      'hero-image13.jpg',
      'hero-image14.jpg',
      'hero-image15.jpg',
      'hero-image16.jpg',
      'hero-image17.jpg',
      'hero-image18.jpg',
      'hero-image19.jpg',
      'hero-image20.jpg',
    ];
    // Retrieve previous image from sessionStorage, or default to an empty string
    const oldHeroImage = sessionStorage.getItem('heroImage') || ''
    // Filter out the previous heroImage
    const availableImages = heroImages.filter(image => image !== oldHeroImage);
    /*
    Math random generates a random number between 0 (inclusive) and 1 (exclusive)
    which gives us a maximum number of the length of the array - 1 after we use the
    floor method. Then this number is used to retrieve the new heroImage from the array
    */
    const heroImage = availableImages[Math.floor((Math.random() * availableImages.length))];
    this.hero.nativeElement.style.backgroundImage = `url('${heroImage}')`;

    sessionStorage.setItem('heroImage', heroImage);
  };

  /**
   * Scrolls to the start of the specified section within the page.
   * @param section section to scroll to
   */
  scrollIntoView(section: HTMLDivElement): void {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

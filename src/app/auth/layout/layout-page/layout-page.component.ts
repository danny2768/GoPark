import { Component } from '@angular/core';

@Component({
  templateUrl: './layout-page.component.html',
  styles: `
  .customShadow {
    box-shadow: '4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9'
  }

  /* Apply bg-mobile properties to all screens by default */
  .bg-mobile {
    background-image: url('/assets/background/authbg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Override bg-mobile properties for screens larger than 768px (md in Tailwind) */
  @media (min-width: 768px) {
    .bg-mobile {
      /* Reset the properties of bg-mobile or set them to match your desired style for larger screens */
      background-image: none;
    }
  }



  `
})
export class LayoutPageComponent {

}

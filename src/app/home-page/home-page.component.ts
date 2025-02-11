import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: false,
  
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  @ViewChild('carousel') carouselDom!: ElementRef;
  items: any[] = [
    {
      image: 'assets/images/tender-coconut.jpg',
      desc: 'Fresh, high-quality tender coconuts with sweet, refreshing water. Sourced from sustainable farms and perfect for hydration on a hot day.',
      title: 'Tender Coconut',
      topic: 'FRESH'
    },
    {
      image: 'assets/images/Fresh_Mature_Coconut.jpg',
      desc: 'Mature coconuts with rich, thick flesh and abundant water, ideal for making coconut milk or enjoying the naturally sweet water.',
      title: 'Mature Coconut',
      topic: 'MATURE'
    },
    {
      image: 'assets/images/organic-coconut-copra.jpg',
      desc: 'High-quality copra coconuts, sun-dried to perfection. These are the best for oil extraction or for long-term storage.',
      title: 'Copra Coconut',
      topic: 'DRY'
    },
    {
      image: 'assets/images/brown-coconut.jpeg',
      desc: 'The Brown Coconut, fully matured with thick brown husk, offering a rich supply of water and meaty flesh. Perfect for grating and using in cooking.',
      title: 'Brown Coconut',
      topic: 'MATURE'
    }
  ];
  
thumbnails:any = this.items
timeRunning = 5000;
timeAutoNext = 7000;
runTimeOut: any;
runNextAuto: any;
positionMap = {
  street: "Surappalli",
  num: "1-812",
  city: "jalakandapuram"
};
mapsURL = `https://maps.google.com/maps?q=11.723182,77.876737&z=20&ie=UTF8&iwloc=&output=embed`;

// mapsURL = `https://maps.google.com/maps?q=${this.positionMap.street}%20${this.positionMap.num}%20${this.positionMap.city}&t=&z=20&ie=UTF8&iwloc=&output=embed`;

@ViewChild('contactSection') contactSection!: ElementRef;

@ViewChild('productSection') productSection!: ElementRef;

scrollToDiv(type: any) {
  if (type =='CONTACT') {
    this.contactSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  } else if ( type == 'PRODUCT') {
    this.productSection.nativeElement.scrollIntoView({ behavior: 'smooth' })
  }
}
ngOnInit() {
  this.autoSlide(); // Start auto-slide on initialization
}

ngOnDestroy() {
  // Clear timers to prevent memory leaks
  clearTimeout(this.runTimeOut);
  clearTimeout(this.runNextAuto);
}

autoSlide() {
  // Automatically move to the next slide after `timeAutoNext` ms
  this.runNextAuto = setTimeout(() => {
    this.onNextClick();
  }, this.timeAutoNext);
}

showSlider(type: string) {
  // Move items in the `items` and `thumbnails` arrays
  if (type === 'next') {
    this.items.push(this.items.shift()!);
    this.thumbnails.push(this.thumbnails.shift()!);
    this.setCarouselClass('next');
  } else {
    this.items.unshift(this.items.pop()!);
    this.thumbnails.unshift(this.thumbnails.pop()!);
    this.setCarouselClass('prev');
  }

  // Handle animation duration and reset classes
  clearTimeout(this.runTimeOut);
  this.runTimeOut = setTimeout(() => {
    this.clearCarouselClasses();
  }, this.timeRunning);

  // Reset auto-slide timer
  clearTimeout(this.runNextAuto);
  this.autoSlide();
}

setCarouselClass(direction: string) {
  const carousel = this.carouselDom.nativeElement;
  carousel.classList.add(direction);
}

clearCarouselClasses() {
  const carousel = this.carouselDom.nativeElement;
  carousel.classList.remove('next', 'prev');
}

onNextClick() {
  this.showSlider('next');
}

onPrevClick() {
  this.showSlider('prev');
}
}
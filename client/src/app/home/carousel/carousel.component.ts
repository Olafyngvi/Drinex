import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/core/services/carousel.service';
import { Carousel } from 'src/app/shared/models/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  carousels: Carousel[];
  activeSlideIndex: number;
  myInterval: number;

  constructor(private carouselService: CarouselService) { }

  ngOnInit(): void {
    this.activeSlideIndex = 0;
    this.myInterval = 5000;
    this.carouselService.getAll().subscribe(carousels => {
      this.carousels = carousels;
    });
  }

}

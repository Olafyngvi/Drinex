import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CarouselService } from 'src/app/core/services/carousel.service';
import { ConfirmationDialogService } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { Carousel } from 'src/app/shared/models/carousel';

@Component({
  selector: 'app-carousels',
  templateUrl: './carousels.component.html',
  styleUrls: ['./carousels.component.scss']
})
export class CarouselsComponent implements OnInit {
  carousels: Carousel[];
  progress = 0;
  addPhotoMode = false;

  constructor(private cds: ConfirmationDialogService,
              private carouselService: CarouselService) { }

  ngOnInit(): void {
    this.carouselService.getAll().subscribe(carousels => {
      this.carousels = carousels;
    });
  }
    // tslint:disable-next-line: typedef
    addPhotoModeToggle() {
      this.addPhotoMode = !this.addPhotoMode;
    }

    // tslint:disable-next-line: typedef
  uploadFile(file: File) {
    // tslint:disable-next-line: deprecation
    this.carouselService.uploadImage(file).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            break;
          case HttpEventType.Response:
            setTimeout(() => {
              this.progress = 0;
              this.addPhotoMode = false;
            }, 1500);
            this.ngOnInit();
        }
      },
      (error) => {
        if (error.errors) {
          console.log(error.errors);
        } else {
          console.log(error);
        }
        this.progress = 0;
      }
    );
  }
  // tslint:disable-next-line: typedef
  deletePhoto(id: number) {
    this.cds
    .confirm(
      'Pažnja',
      'Jeste li sigurni da želite obrisati odabranu sliku ?',
      'Obriši',
      'Odustani'
    )
    .then((confirmed) => {
      if (confirmed) {
      this.carouselService.deletePhoto(id).subscribe(resp => {
        this.ngOnInit();
      });
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carousel } from 'src/app/shared/models/carousel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getAll() {
    return this.http.get<Carousel[]>(this.baseUrl + 'Carousel');
  }

  // tslint:disable-next-line: typedef
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('photo', file, 'image.png');
    return this.http.post(this.baseUrl + 'Carousel/', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  // tslint:disable-next-line: typedef
  deletePhoto(id: number) {
    return this.http.delete(this.baseUrl + 'Carousel/' + id);
  }
}

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-servis',
  templateUrl: './servis.component.html',
  styleUrls: ['./servis.component.scss']
})
export class ServisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }


}

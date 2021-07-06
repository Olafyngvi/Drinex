import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../shared/models/contact';
import { ContactService } from './contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: Contact = {
    name: '',
    mail: '',
    phoneNumber: '',
    message: ''
  };
  constructor(private contactService: ContactService,
              private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  // onSubmit() {
    // tslint:disable-next-line: deprecation
    // this.contactService.getMessage(this.contact).subscribe(res => {
      // this.router.navigate(['/successful']);
    // }, err => {
      // console.log(err);
    // });
  // }

 onSubmit(form: NgForm): void {
    if (form.invalid) {
      console.log(form.invalid);
    } else {
      this.contactService.getMessage(this.contact).subscribe(res => {
      this.router.navigate(['/successful']);
    }, err => {
      console.log(err);
    });
    }
  }

}

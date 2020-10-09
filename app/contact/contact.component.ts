import { ChangeDetectorRef, Component } from '@angular/core';
import { DrawerPage } from '~/shared/drawer/drawer.page';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as Email from 'nativescript-email';
import * as Phone from "nativescript-phone";

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends DrawerPage {


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private fonticon: TNSFontIconService
  ) { 
    super(changeDetectorRef);
  }

  onDrawerButtonTap(): void {
    this.openDrawer();
  }

  sendEmail() {
    Email.available()
      .then((avail: boolean) => {
        if (avail) {
          Email.compose({
            to: ['confusion@food.net'],
            subject: '[ConFusion]: Query',
            body: 'Dear Sir/Madam:'
          });
        }
        else
          console.log('No Email Configured');
      });
  }

  callRestaurant() {
    Phone.dial('+852 1234 5678', true);
  }

}
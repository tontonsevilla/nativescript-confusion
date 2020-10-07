import { ChangeDetectorRef, Component } from '@angular/core';
import { DrawerPage } from '~/shared/drawer/drawer.page';


@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends DrawerPage {


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { 
    super(changeDetectorRef);
  }

  onDrawerButtonTap(): void {
    this.openDrawer();
}

}
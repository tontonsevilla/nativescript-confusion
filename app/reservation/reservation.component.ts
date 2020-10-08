import { Component, OnInit, Inject, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ReservationModalComponent } from "../reservationmodal/reservationmodal.component";
import { DrawerPage } from '~/shared/drawer/drawer.page';
import { Page, View } from 'tns-core-modules/ui/page';
import { CouchbaseService } from '~/services/couchbase.service';
import * as enums from "ui/enums";

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent extends DrawerPage implements OnInit {

    reservation: FormGroup;
    submitted = false;
    docId: string = "reservations";
    reservations: Array<any> = [];

    constructor(
        private formBuilder: FormBuilder,
        private modalService: ModalDialogService, 
        private vcRef: ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        private couchbaseService: CouchbaseService,
        private page: Page
    ) {

        super(changeDetectorRef);

        this.reservation = this.formBuilder.group({
            guests: 3,
            smoking: false,
            dateTime: ['', Validators.required]
        });

        let doc = this.couchbaseService.getDocument(this.docId);
        if(doc == null) {
            this.couchbaseService.createDocument({"reservations": []}, this.docId);
        } else {
            this.reservations = doc.reservations;
        }
    }

    ngOnInit() {

    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text});
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;
        
        this.reservation.patchValue({ dateTime: textField.text});
    }

    onSubmit() {
        this.reservations.push(this.reservation.value);
        this.couchbaseService.updateDocument(this.docId, {"reservations": this.reservations});

        console.log(this.couchbaseService.getDocument(this.docId));

        let reservationForm: View;
        let reservationFormReadOnly: View;

        reservationForm = this.page.getViewById<View>('reservationForm');
        reservationFormReadOnly = this.page.getViewById<View>('reservationFormReadOnly');

        reservationForm.animate({
            opacity: 0,
            duration: 500,
            scale: { x: 0, y: 0 }
        }).then(() => {
            
            reservationFormReadOnly.animate({
                opacity: 0,
                scale: { x: 0, y: 0 }
            }).then(() => {
                this.submitted = true;

                reservationFormReadOnly.animate({
                    opacity: 1,
                    duration: 500,
                    scale: { x: 1, y: 1 }
                });
            });
        });
    }

    createModalView(args) {

        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({guests: result});
                }
                else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result});
                }
            });

    }

    onDrawerButtonTap(): void {
        this.openDrawer();
    }

}
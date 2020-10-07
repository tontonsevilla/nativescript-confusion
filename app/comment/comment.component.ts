import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page } from 'ui/page';

@Component({
    moduleId: module.id,
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

    comment: FormGroup;

    constructor(
        private params: ModalDialogParams,
        private page: Page,
        private formBuilder: FormBuilder
    ) {
        this.comment = this.formBuilder.group({
            author: ['', Validators.required],
            rating: 5,
            comment: ['', Validators.required]
        });
    }

    ngOnInit() {

    }

    onSubmit(): void {
        this.params.closeCallback(this.comment.value);
    }

}
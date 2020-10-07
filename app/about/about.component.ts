import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { LeaderService } from '~/services/leader.service';
import { DrawerPage } from '~/shared/drawer/drawer.page';
import { Leader } from '~/shared/leader';
import * as app from "application";

@Component({
  selector: 'app-about',
  moduleId: module.id,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends DrawerPage implements OnInit {

    errMess: string;
    leaders: Leader[];

    constructor(
        private leaderService: LeaderService,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject('baseURL') private baseURL
    ) { 
        super(changeDetectorRef);
    }

    ngOnInit(): void {
        this.leaderService.getLeaders()
            .subscribe(leaders => this.leaders = leaders,
                errmess => this.errMess = <any>errmess);
    }

    onDrawerButtonTap(): void {
        this.openDrawer();
    }

}
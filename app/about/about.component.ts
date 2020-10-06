import { Component, Inject, OnInit } from '@angular/core';
import { LeaderService } from '~/services/leader.service';
import { Leader } from '~/shared/leader';


@Component({
  selector: 'app-about',
  moduleId: module.id,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    errMess: string;
    leaders: Leader[];

    constructor(
        private leaderService: LeaderService,
        @Inject('baseURL') private baseURL
    ) { }

    ngOnInit(): void {
        this.leaderService.getLeaders()
            .subscribe(leaders => this.leaders = leaders,
                errmess => this.errMess = <any>errmess);
    }

}
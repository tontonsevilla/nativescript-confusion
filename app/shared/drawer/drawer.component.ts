import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlatformService } from '~/services/platform.service';

@Component({
    selector: 'drawer-content',
    templateUrl: './shared/drawer/drawer.component.html'
})
export class DrawerComponent implements OnInit, OnDestroy {

    constructor(
        private platformService: PlatformService
    ) {
        
    }

    ngOnInit(): void {
        this.platformService.printPlatformInfo(); 
        this.platformService.startMonitoringNetwork()
        .subscribe((message: string) => {
        console.log(message); 
        
        });
    }

    ngOnDestroy(): void {
        this.platformService.stopMonitoringNetwork();
    }

}
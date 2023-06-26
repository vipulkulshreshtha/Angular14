import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { Hero } from "../hero";
import { HeroComponent } from "../hero/hero.component";
import { HeroService } from "../hero.service";
import { ComponentFixture, flush, tick, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";
import { HeroDetailComponent } from "./hero-detail.component";
import { TestBed } from "@angular/core/testing";
import {Location} from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { By } from "@angular/platform-browser";
import { HeroesComponent } from "../heroes/heroes.component";

@Directive({
    selector:"[routerLink]",
    host: {"(click)":"onClick()"},
})
export class RouterLinkDirectivestub{
    @Input("[routerlink]") linkParams:any;
    navigatedTO: any =null;

    onClick(){
        this.navigatedTO=this.linkParams;
    }
}


describe("Heros Component (deep tests)",()=>{
    let fixture:ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation; 
    let HEROES;
    beforeEach(()=>{
        HEROES=[
            {id: 1, name: 'Spider Dude', strength: 10},
            {id: 2, name: 'Wonderfull Women', strength: 24},
            {id: 3, name: 'Spider Dude', strength: 18},
        ];
        mockActivatedRoute={
            snapshot: {paraamp:{get:()=>{return '3';}}}
        };
        mockHeroService=jasmine.createSpyObj(["getHero","updateHero"]);
        mockLocation==jasmine.createSpyObj(["back"]);
        TestBed.configureTestingModule({
            declarations:[HeroDetailComponent],
            providers:[
                {provide:ActivatedRoute,useValue:mockActivatedRoute},
                {provide:HeroService,useValue:mockHeroService},
                {provide:Location,useValue:mockLocation},
            ],
        });
        fixture=TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({
            id:3, name:"spider men",strength:20
        }));
        it("should render the hero name in a h2 tag",()=>{
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
                "SUPERDUDE"
            );
        })
        // it("should have the correct route for the first hero",fakeAync(()=>{
        //     mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //     fixture.detectChanges();
        //     const heroComponent=fixture.debugElement.queryAll(By.directive(HeroComponent));
        //     let routerLink=heroComponent[0].query(By.directive(HeroesComponent));


        // }))
        it("should call updateHero when save is called",waitForAsync(()=>{
            mockHeroService.getHeroes.and.returnValue(of({}));
            fixture.detectChanges();
            
            fixture.componentInstance.save();
           
            fixture.whenStable().then(()=>{
              expect(mockHeroService.updateHero).toHaveBeenCalled();
            });
            expect(mockHeroService.updateHero).toHaveBeenCalled();
        }))
    })
});
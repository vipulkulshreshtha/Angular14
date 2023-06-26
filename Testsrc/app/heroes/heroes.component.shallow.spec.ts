import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";
import { HeroComponent } from "../hero/hero.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe("Heros Component (shallow tests)",()=>{
    let fixture: ComponentFixture<HeroesComponent>; 
    let mockHeroService;
    let HEROES;
    @Component({
        selector: "app-hero",
        template: "<div></div>",
      })
      class FakeHeroesComponent{
        @Input() hero:Hero;
        //@Output
      }
    beforeEach(()=>{
        HEROES=[
            {id: 1, name: 'Spider Dude', strength: 10},
            {id: 2, name: 'Wonderfull Women', strength: 24},
            {id: 3, name: 'Spider Dude', strength: 18},
        ];
        mockHeroService = jasmine.createSpyObj("getHeroes","addHero","deleteHero");

        TestBed.configureTestingModule({
            declarations:[HeroesComponent,FakeHeroesComponent],
            providers: [
                {
                provide: HeroService,
                useValue: mockHeroService,
            }
        ],
            //schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(HeroesComponent);
    })
    it('should set heroes correctly from the service',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });
    it('should create one li for each hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css("li")).length).toBe(3);
    });
    
});
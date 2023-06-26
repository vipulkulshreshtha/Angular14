import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";
import { HeroComponent } from "../hero/hero.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe("Heros Component (deep tests)",()=>{
    let fixture: ComponentFixture<HeroesComponent>; 
    let mockHeroService;
    let HEROES;
    beforeEach(()=>{
        HEROES=[
            {id: 1, name: 'Spider Dude', strength: 10},
            {id: 2, name: 'Wonderfull Women', strength: 24},
            {id: 3, name: 'Spider Dude', strength: 18},
        ];
        mockHeroService = jasmine.createSpyObj("getHeroes","addHero","deleteHero");

        TestBed.configureTestingModule({
            declarations:[HeroesComponent,HeroComponent],
            providers: [
                {
                provide: HeroService,
                useValue: mockHeroService,
            }
        ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it("should be true", ()=>{
        expect(true).toBe(true);
    });
    it("should render each hero as a HeroComponent",()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponentDEs=fixture.debugElement.queryAll(
            By.directive(HeroComponent)
            );
        expect(true).toBe(true);
        expect(heroComponentDEs.length).toBe(3);
        //expect(heroComponentDEs[0].componentInstance.hero.name).toEqual("Super Dude");

        for(let i=0;i<heroComponentDEs.length;i++)
        {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });
    it('should add a new  hero to the hero list when the add button is clicked',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const inputElement=fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton= fixture.debugElement.queryAll(By.css('button'))[0];
        inputElement.value=name;
        addButton.triggerEventHandler('click',null);
        fixture.detectChanges();
        const heroText= fixture.debugElement.query(By.css("ul")).nativeElement.textContent;
        expect(heroText).toContain(name);
    });
});
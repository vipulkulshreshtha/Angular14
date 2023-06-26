import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("HeroComponent(shallow test)",()=>{
    let fixture:ComponentFixture<HeroComponent>;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas: [NO_ERRORS_SCHEMA],
        });
        fixture=TestBed.createComponent(HeroComponent);
       
    });
    it("Should have the correct hero",()=>{
        fixture.componentInstance.hero = {id: 1, name: 'Spider Dude', strength: 3};
        //fixture.detectChanges();
        expect(fixture.componentInstance.hero.name).toEqual('Spider Dude');
    });
    it("Should render the hero name in an another tag",()=>{
        fixture.componentInstance.hero = {id: 1, name: 'Spider Dude', strength: 3,};
        fixture.detectChanges();
        
        let deA=fixture.debugElement.query(By.css('a'));

        expect(deA.nativeElement.textContent).toContain("SuperDude");
        
        // expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent
        // ).toContain("SuperDude");
        
        // expect(fixture.nativeElement.querySelector('a').textContent).toContain(
        //     "SuperDudes"
        //     );
    });
});
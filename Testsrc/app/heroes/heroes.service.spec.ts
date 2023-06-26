import { TestBed, inject } from "@angular/core/testing"
import { HeroService } from "../hero.service"
import { MessageService } from "../message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService',()=>{
    let mockMessageService;
    let httpTestingController:HttpTestingController;
    let service:HeroService;
    beforeEach(()=>{
        mockMessageService=jasmine.createSpyObj(["add"]);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HeroService,
                {provide: MessageService,useValue:mockMessageService}
            ],
        });
        httpTestingController=TestBed.inject(HttpTestingController);
        service=TestBed.inject(HeroService);
        //let heoSvc=TestBed.inject(HeroService);
        //let msgSvc=TestBed.inject(MessageService);
    });

    // describe("getHero",()=>{
    //     it('should  call get with the correct url',inject(
    //         [
    //             HeroService,
    //             HttpTestingController
    //         ],
    //         (service:HeroService,controller:HttpTestingController)=>{
    //             service.getHero(4);
    //         }
    //     ));
    // });
    it("should call get with the correct url",()=>{
        service.getHero(4).subscribe((hero)=>{
            //expect(hero.id).toBe(4);
        });
        service.getHero(4).subscribe();
        service.getHero(3).subscribe();

        const req=httpTestingController.expectOne("api/heroes/4");
        req.flush({id: 4, name:"Super Dude", "Strength":100});
        expect(req.request.method);
        httpTestingController.verify();
    });
});
import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent',()=>{
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;
    beforeEach(()=>{
        HEROES=[
            {id: 1, name: 'Spider Dude', strength: 10},
            {id: 2, name: 'Wonderfull Women', strength: 24},
            {id: 3, name: 'Spider Dude', strength: 18},
        ];
        
        mockHeroService=jasmine.createSpyObj([
            'getHeroes',
            'addHero',
            'deleteHero'
        ]);

        component: new HeroesComponent(mockHeroService);
        //component: ngOnInit();
    });
    describe('delete ',()=>{
        it('should remove the indicated hero from heroes list',()=>{
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes=HEROES;

            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);
        });

        it('should call deleteHero',()=>{
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes=HEROES;
            
            component.delete(HEROES[2]);

            //expect(component.heroes.length).toHaveBeenCalled();
            expect( mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);

        });
    });
});
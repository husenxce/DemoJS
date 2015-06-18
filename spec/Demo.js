describe('FinalProject',function(){

	var FinalProject = require('../Demo');
	var Airplane, FPInst;

beforeEach(function(){

FPInst = new FinalProject();	
Airplane = Object.create(FPInst.Airplane);
Representative = Object.create(FPInst.Representative);

});

describe('Airplane Constructor',function(){
it('should correctly set airline',function(){
Airplane.setAirlines("asd;lfksdaflkj");
expect(Airplane.getAirlines()).toEqual("asd;lfksdaflkj");
});
it('should correctly set airplane model correctly',function(){
Airplane.setModel("AXYZLDIIDA-34345");
expect(Airplane.getModel()).toEqual("AXYZLDIIDA-34345");
});
it('should create economy seats.',function(){
Airplane.createEconomySeats();

 var seats = [];
                        var i=0,j=0,k=1;
                        for(i=0;i<30;i++)
                        {
                        seats[i]=[];
                        for(j=0;j<6;j++)
                        seats[i][j]=(k++)+"E";
                        }

 
 expect(seats).toEqual(Airplane.getEconomySeats());

});
it('should create first class seats.',function(){
Airplane.createFirstSeats();

var seats = [];
                        var i=0,j=0,k=1;
                        for(i=0;i<5;i++)
                        {
                        seats[i]=[];
                        for(j=0;j<4;j++)
                        seats[i][j]=(k++)+"F";
                        }
 
 expect(seats).toEqual(Airplane.getFirstSeats());

});});


describe('Representative Constructor',function(){
it('should correctly set name',function(){
Representative.setName("Alpha,Beta");
expect(Representative.getName()).toEqual("Alpha, Beta");
});
it('should set plane Representative',function(){
Airplane.setrep(Representative);
expect(Airplane.getrep()).toEqual(Representative);
});
});


describe('It should succesfuly add passengers.',function(){





});


});
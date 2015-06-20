//********************************Language: Javascript******************************
"use strict";
//********************************Class Declarations********************************

function AirlineProgram(){  console.log('Demo');  };

//Passenger Class
var Passenger = {
             firstName: new String(),
             lastName: new String(),
             seat: new String(),
	               setName: function(name){    

                                        if(typeof(name)==="string")
                                        {
                                             this.firstName = name.split(", ")[1];
	                                     this.lastName = name.split(", ")[0];}
                                        },
                 getName:function(){
                 	     return (this.lastName+", "+this.firstName);},

                 assignseat: function(seat){
                         this.seat = seat;
                 }

                };
//Airplane Class
AirlineProgram.prototype.Airplane =  {
                  
                  classes:{Economy:new Array(),First: new Array()},
                  passengers: new Array(),
                  userChoice: {classChoice: new String(), NumofPassengers:0, seatingPreference: new String()},
                  seatingPreference:{Economy:["Aisle","Center","Window"],First:["Aisle","Window"]},
                  Model:new String(),
                  Airlines:new String(),
                  rep: new Object(),
                  getEconomySeats: function(){
                      return this.classes.Economy;
                  },
                  createEconomySeats: function(){
                        var seats = [];
                        var i=0,j=0,k=1;
                        for(i=0;i<30;i++)
                        {
                        seats[i]=[];
                        for(j=0;j<6;j++)
                        seats[i][j]=(k++)+"E";
                        }
                        this.classes.Economy = seats;
                  
                  },
                  setClass:function(plane){
                       process.stdin.setEncoding('utf8');
                       var callback =  function() {
                       var arg = process.stdin.read();
                       if(arg!==null)
                       {
                        plane.userChoice.classChoice = arg;
                        process.stdin.removeListener('readable',callback);
                        plane.setNumofPassengers(plane);
                       }
                       else
                       {
                        process.stdin.removeListener('readable',callback);
                        plane.setClass(plane);
                       }
                       };
                       console.log("\nPlease specify F(First Class) or E(Economy).\n");
                       process.stdin.on('readable',callback);
                  },
                  setNumofPassengers:function(plane){
                       process.stdin.setEncoding('utf8');
                       var arg;
                       var nextCall = function(){
                        plane.userChoice.NumofPassengers = arg;
                        process.stdin.removeListener('readable',callback);
                        plane.setSeatingPreference(plane);

                       };
                       var callback =  function() {
                       arg = process.stdin.read();
                        if(arg!==null)
                       {
                        if(plane.userChoice.classChoice.trim()==="E")
                        {
                           if(arg<1||arg>3)
                           {
                           console.log("\nOnly 1-3 passengers accepted.");
                           process.stdin.removeListener('readable',callback);
                           plane.setNumofPassengers(plane);
                           }
                           else
                           {
                            nextCall();    
                           }
                        }
                        else if(plane.userChoice.classChoice.trim()==="F"){
                            if(arg<1||arg>2)
                           {
                           console.log("\nOnly 1-2 passengers accepted.");
                           process.stdin.removeListener('readable',callback);
                           plane.setNumofPassengers(plane);
                           }
                           else
                           {
                            nextCall();
                           }
                        }
                       }
                       else
                        plane.setClass(plane);
                       };
                       console.log("\nPlease specify the number of passengers travelling together.\n");
                       process.stdin.on('readable',callback);
                  },
                  setSeatingPreference: function(plane){
                       process.stdin.setEncoding('utf8');
                       var arg;
                       var callback =  function() {
                       arg = process.stdin.read();
                       if(arg!==null)
                       {
                        plane.userChoice.seatingPreference = arg;
                        process.stdin.removeListener('readable',callback);
                        plane.searchSeating(plane.userChoice.NumofPassengers,plane.userChoice.classChoice,plane.userChoice.seatingPreference, plane);
                       }
                       };
                       if(plane.userChoice.classChoice.trim()==="F")
                       console.log("\nPlease specify the seating preference W(Window) or A(Aisle).\n");
                       else if(plane.userChoice.classChoice.trim()==="E")
                       console.log("\nPlease specify the seating preference  W(Window) or A(Aisle) or C(Center).\n");
                       process.stdin.on('readable',callback);
                  },
                  searchSeating: function(numofPassengers,classChoice,seatingPreference,plane){

                   var i=0, j=0, seats, rows=" ", available = 0, seati=[],seatj=[];
                   seats=this.getEconomySeats();
                   if(classChoice.trim()==="E")
                   {
                   for(i=0;i<30;i++)
                   {
                   for(j=0;j<6;j++)
                   {
                    if(seatingPreference.trim()==="W")
                    {
                    if(j===0||j===5)
                    {

                     if(seats[i][j]!=="X" && available<numofPassengers){available++; seati.push(i);seatj.push(j);}
                    }
                    }
                    else 
                     if(seatingPreference.trim()==="C")
                    {
                    if(j===2||j===3)
                    {

                    if(seats[i][j]!=="X" && available<numofPassengers){available++; seati.push(i);seatj.push(j);}
                    }
                    }
                    else
                     if(seatingPreference.trim()==="A")
                    {
                    if(j===1||j===4)
                    {
                     if(seats[i][j]!=="X" && available<numofPassengers){available++; seati.push(i);seatj.push(j);}
                    }
                    }
                   }
                   }

                   if(available%numofPassengers===0)
                   {
                    var i =0, assignedSeats=[];
                    for(i;i<seati.length;i++)
                    {
                    assignedSeats.push(seats[seati[i]][seatj[i]]);
                    seats[seati[i]][seatj[i]]="X";
                    }
                    plane.classes.Economy = seats;
                    plane.addPassengers(plane,assignedSeats);
                       
                   }
                   else
                   {
                    console.log("Seats not available.");

                    startUI(plane);
                   }
                   } 
                   else if(classChoice.trim() ==="F")
                   {
                   var i=0, j=0, seats, rows=" ";
                   seats=this.getFirstSeats();
                   for(i=0;i<5;i++)
                   {
                   for(j=0;j<4;j++)
                   {
                   if(seatingPreference.trim()==="A")
                   {    
                    if(j===1||j===2) 
                     if(seats[i][j]!=="X" && available<numofPassengers){available++; seati.push(i);seatj.push(j);}
                   }
                   else if(seatingPreference.trim()==="W")
                   {
                    if(j===0||j===3) 
                     if(seats[i][j]!=="X" && available<numofPassengers){available++; seati.push(i);seatj.push(j);}
                   }
                   }}

                   if(available%numofPassengers!==0)
                   {
                        console.log("Seats not available.");
                        startUI(plane);
                   }
                   else
                   {
                    var i =0, assignedSeats = [];
                    for(i;i<seati.length;i++)
                    {
                        assignedSeats.push(seats[seati[i]][seatj[i]]);
                        seats[seati[i]][seatj[i]]="X";
                    }
                    plane.classes.First = seats;
                    plane.addPassengers(plane,assignedSeats);
                   }
                  }},
                  getFirstSeats: function(){
                     return this.classes.First;
                  },
                  createFirstSeats: function(){
                        var seats = [];
                        var i=0,j=0,k=1;
                        for(i=0;i<5;i++)
                        {
                        seats[i]=[];
                        for(j=0;j<4;j++)
                        seats[i][j]=(k++)+"F";
                        }
                        this.classes.First = seats;
                  },
                  setAirlines: function(airline){
                        if(typeof(airline)==="string")
                        this.Airlines = airline;
                  },
                  getAirlines: function(){
                        return this.Airlines;
                  },
                  setModel: function(model){
                        if(typeof(model)==="string")
                        this.Model = model;
                  },
                  getModel: function(){
                        return this.Model;
                  },
                  setrep: function(rep){
                        this.rep = rep;
                  },
                  getrep: function(){
                        return this.rep;
                  },
                  addPassengers: function(plane,assignedSeats){
                        var passenger,passengerNames;
                        console.log("\nPlease enter the names of passengers in the following format: LastName1,FirstName1 LastName2,FirstName2.....\n");
                        var callback = function(){
                        var arg = process.stdin.read();
                        if(arg!==null)
                        {
                          passengerNames = arg.split(" ");
                        }
                         for(var i=0;i<passengerNames.length;i++)        
                        {
                         passenger = Object.create(Passenger);
                         passenger.setName(passengerNames[i]);
                         passenger.assignseat(assignedSeats[i]);
                         plane.passengers.push(passenger);
                        }                 
                        console.log("\nSeats booked successfuly.\n");
                        process.stdin.removeListener('readable',callback);
                        startUI(plane);
                        };
                       process.stdin.on('readable',callback);
                  },
                  showSeating: function(){
                   var i=0, j=0, seats, rows=" ";
                   seats=this.getEconomySeats();
                   console.log("\nEconomy Class");
                   console.log("-----------------------------------------");
                   for(i=0;i<30;i++)
                   {
                   rows=" ";
                   for(j=0;j<6;j++)
                   {
                    rows=rows+seats[i][j]+" ";
                   }
                   console.log(rows);
                   console.log("\n");
                   } 
                   var i=0, j=0, seatsf, rows=" ";
                   seatsf=this.getFirstSeats();
                   console.log("-----------------------------------------");
                   console.log("\nFirst Class");
                   console.log("-----------------------------------------");
                   for(i=0;i<5;i++)
                   {
                   rows=" ";
                   for(j=0;j<4;j++)
                   {
                    rows=rows+seatsf[i][j]+" ";
                   }
                   console.log(rows);
                   console.log("\n");
                   }
                  }
};
//Airline representative class
AirlineProgram.prototype.Representative = {
             userType: "Admin",
             firstName: new String(),
             lastName: new String(),
                 setName: function(name){    

                                             if(typeof(name)==="string")
                                        {
                                             this.firstName = name.split(",")[1];
                                             this.lastName = name.split(",")[0];}
                                        },
                 getName:function(){
                             return this.lastName+", "+this.firstName;
                             }
};
//********************************Program Starts Here********************************
var startApp = function(){

							    var Project = new AirlineProgram();
                                var plane = Object.create(Project.Airplane);

                                    plane.setAirlines("ABC");
                                    plane.setModel("Airbus-X");
                                    plane.createFirstSeats();
                                    plane.createEconomySeats();

                                var rep = Object.create(Project.Representative);
                                    rep.setName("Doe, John");
                                    plane.setrep(rep);
                                    startUI(plane);

};
var startUI = function(plane){
                                //Authorization
                                if(plane.getrep().getName().localeCompare("Doe, John"))
                                {
                                console.log("Please select from the following optons:\n");
                                console.log("1. Add Passengers\n");
                                console.log("2. Show Seating\n");
                                console.log("3. Quit\n");
                                process.stdin.setEncoding('utf8');
                                var callback = function() {
                                  var chunk = process.stdin.read();
                                  if (chunk !== null) {
                                    if(parseInt(chunk)===3)
                                       process.exit(0);
                                    if(parseInt(chunk)===2)
                                    {
                                       process.stdin.removeListener('readable',callback);
                                       plane.showSeating();
                                       chunk=0;
                                       startUI(plane);
                                    }
                                    if(parseInt(chunk)==1)
                                    {
                                      process.stdin.removeListener('readable',callback);
                                      plane.setClass(plane);
                                    }
                                  }
                                };
                                process.stdin.on('readable', callback);
                        }
};
startApp();

module.exports = AirlineProgram;
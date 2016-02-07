'use strict';

import * as ng from 'angular';

export class DemoController {
  
  public items: any = [
      { name: "Luke Skywalker", firstname: "Luke", title: "Hero", presence: "available", department: "Good guys", imageUrl: "Persona.Person2.png" },
      { name: "Darth Vader", firstname: "Darth", title: "Right hand", presence: "busy", department: "Bad guys", imageUrl: "Persona.Person2.png" },
      { name: "Han Solo", firstname: "Han", title: "Hero", presence: "away", department: "Good guys", imageUrl: "Persona.Person2.png" },
      { name: "Mr. Emperor", firstname: "Emperor", title: "Emperor Supreme", presence: "blocked", department: "Bad guys", imageUrl: "Persona.Person2.png" }
  ];
  
  private selected1: any[] = []; 
  private selected2: any[] = []; 
  
  public groupby: string = 'department';
  public namefield: string = 'name'; 
  public titlefield: string = 'title';
  public imagefield: string = 'imageUrl';
  public presencefield: string = 'presence';

  constructor() {
  };

  ShowSelected() {
      alert(this.selected1.length);
  }


  ShowPerson(person:any){
    alert("You selected: " + person.name);    
  }


}

export var module: ng.IModule = ng.module('demoApp', [
    'officeuifabric.core',
    'officeuifabric.components.orgchart'])
  .controller('demoController', [DemoController]);

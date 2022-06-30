import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 formControl !:FormControl
  constructor(private _router:Router) { }

  ngOnInit(): void {
    this.formControl = new FormControl('', [Validators.required])
  }

  toQuestions(){
    console.log('ehehehe')
  this._router.navigate(['Questions'])
  }

}

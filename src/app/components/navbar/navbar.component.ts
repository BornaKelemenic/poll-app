import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'poll-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit
{
  search: FormControl = new FormControl('', [Validators.required]);

  constructor()
  {}

  ngOnInit()
  {
  }

}

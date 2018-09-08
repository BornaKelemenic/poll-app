import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../helpful-functions/functions';

@Component({
  selector: 'poll-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit
{
  search: FormControl = new FormControl('', [noWhitespaceValidator]);

  constructor()
  {}

  ngOnInit()
  {
  }

}

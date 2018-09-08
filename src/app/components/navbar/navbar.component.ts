import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../helpful-functions/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'poll-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit
{
  search: FormControl = new FormControl('', [noWhitespaceValidator]);

  constructor(
    private router: Router
  )
  {}

  ngOnInit()
  {
  }

  searchPoll(event: KeyboardEvent)
  {
    if (event.key === 'Enter' && this.search.value  && this.search.value.trim())
    {
      this.router.navigate(['/poll', this.search.value.trim()]);
    }
  }

}

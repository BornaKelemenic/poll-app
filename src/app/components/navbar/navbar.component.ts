import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { noWhitespaceValidator } from '../../helpful-functions/functions';
import { Router } from '@angular/router';
import { PollService } from '../../services/poll.service';
import { debounceTime, filter } from 'rxjs/operators';
import { ISearchResult } from '../../models/poll.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'poll-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit
{
  search: FormControl = new FormControl('');

  search_results: ISearchResult[] = [];

  constructor(
    private router: Router,
    private pollService: PollService
  )
  { }

  ngOnInit()
  {
    this.search.valueChanges.pipe(debounceTime(1000), filter(term => !!term))
      .subscribe(value => this.searchPoll());
  }

  searchPoll()
  {
    if (typeof this.search.value !== 'string')
    {
      return;
    }

    const term = encodeURIComponent(this.search.value.trim());

    this.pollService.searchForAPoll(term).subscribe(res =>
    {
      console.log('Response for a search', res);
      this.search_results = res.value;

    }, err =>
      {
        console.log('Error on search', err);
      });
  }

  displayFn(result: ISearchResult): string | undefined
  {
    return result ? result.Question : undefined;
  }

  selectPoll(event: MatAutocompleteSelectedEvent)
  {
    const result: ISearchResult = event.option.value;

    this.router.navigate(['/poll', result.ParentPollGuid]);
  }
}

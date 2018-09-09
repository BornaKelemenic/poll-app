import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { IPollReport } from '../../models/poll.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'poll-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.scss']
})
export class PollResultsComponent implements OnInit
{
  poll: IPollReport;
  guid: string;

  loading = false;

  constructor(
    private pollService: PollService,
    private route: ActivatedRoute,
    private router: Router
  )
  { }

  ngOnInit()
  {
    this.route.params.subscribe(params =>
    {
      this.guid = params.guid;

      this.getPollReport();
    });
  }

  private getPollReport()
  {
    this.loading = true;

    this.pollService.getResults(this.guid).subscribe(res =>
    {
      if (!res) { this.router.navigate(['/']); }
      this.poll = res;
      console.log('Poll report ', this.poll);
      this.loading = false;

    }, err =>
      {
        this.loading = false;
        console.log('Error geting poll report', err);

      });
  }
}

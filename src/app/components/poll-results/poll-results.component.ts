import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { IPollReport, IPollAnswerSummary } from '../../models/poll.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'poll-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.scss']
})
export class PollResultsComponent implements OnInit
{
  poll: IPollReport;
  copyPollAnswers: IPollAnswerSummary[];
  highestVote: number = 0;

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
      this.copyPollAnswers = JSON.parse(JSON.stringify(this.poll.PollAnswerSummaries));
      console.log('Poll report ', this.poll);
      this.initChart();
      this.findHighestVote();
      this.loading = false;

    }, err =>
      {
        this.loading = false;
        console.log('Error geting poll report', err);

      });
  }

  private initChart()
  {
    this.copyPollAnswers.sort((a1, a2) => a2.Count - a1.Count);

    const ctxCanvas = (<HTMLCanvasElement>document.getElementById('chart-canvas')).getContext('2d');
    const myChart = new Chart(ctxCanvas, {

      type: 'pie',
      data: {
        labels: this.copyPollAnswers.map(a => a.AnswerText),
        datasets: [
          {
            data: this.copyPollAnswers.map(a => a.Count),
            backgroundColor: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'],
            borderWidth: 0
          }
        ]
      },
      options: {
        legend: { display: false }
      }
    });

    /* {
      labels: {
        render: 'label',
        fontColor: (data) => {
          const rgb = hexToRgb(data.dataset.backgroundColor[data.index]);
          console.log('RGB value', rgb);
          const threshold = 140;
          const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
          return luminance > threshold ? 'black' : 'white';
        },
        precision: 2
      }
    } */

  }

  private findHighestVote()
  {
    this.copyPollAnswers.sort((a1, a2) => a2.Count - a1.Count);
    this.highestVote = this.copyPollAnswers[0].Count;
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-innovation-markdown',
  templateUrl: './innovation-markdown.component.html',
  styleUrls: ['./innovation-markdown.component.scss']
})
export class InnovationMarkdownComponent implements OnInit {

  @Input() innovationCode: string;

  constructor() { }

  ngOnInit() {
  }

}

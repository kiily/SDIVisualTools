import { InnovationMarkdownComponent } from './innovation-markdown/innovation-markdown.component';
import { MarkdownModule } from 'angular2-markdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        InnovationMarkdownComponent
    ],
    imports: [
        CommonModule,
        MarkdownModule.forRoot()
    ],
    exports: [
        InnovationMarkdownComponent,
        MarkdownModule
    ]
})
export class InnovationModule {}

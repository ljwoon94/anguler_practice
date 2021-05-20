import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {
  name = '';
  
  constructor(private route: ActivatedRoute) {
    this.route.snapshot.paramMap.get('name');
   }

    
  ngOnInit(): void {
  }

}

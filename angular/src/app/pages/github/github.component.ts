import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github/github.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  per_page: number = 10
  query: string = ''

  repos = []

  constructor(
    private githubService: GithubService
  ) { }

  ngOnInit(): void {
    this.githubService.getAllRepos({
      per_page: this.per_page,
      query: this.query
    }).then(data => {
      this.repos = data
      console.log(this.repos)
    }, (err) => {
      this.repos = []
    })
  }

}
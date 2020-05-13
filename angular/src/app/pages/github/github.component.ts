import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github/github.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  per_page: number = 10
  total_repos: number = 0
  total_repos_desc: string = `0 repository results`
  query: string = 't'
  searching: boolean = false
  no_matching_data: string = ''
  search_again: string = ''

  repos = []
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  p: number = 1
  total: number
  loading: boolean

  constructor(
    private githubService: GithubService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  setupContent(page): void {
    this.repos = []
    this.searching = true
    this.p = page
    this.loading = true
    this.githubService.getAllRepos({
      per_page: this.per_page,
      query: this.query,
      page: this.p
    }).then(data => {
      this.loading = false
      this.total_repos = data.total_count
      this.total_repos_desc = `${data.total_count} repository results`
      this.total = data.total_count
      for (let i = 0; i < data.items.length; i++) {
        let o = data.items[i]
        let s = `Updated on ${this.days[new Date(o.updated_at).getDay()]} ${this.months[new Date().getMonth()]} ${new Date().getDate()} ${new Date().getFullYear()}`
        data.items[i].updated_date = s
      }
      this.repos = data.items
    }, (err) => {
      this.repos = []
    })
  }

  onPostClicked(id: number): void {
    this.router.navigate([`post`], {
      queryParams: {
        postId: id
      }
    })
  }

  onEnterPressed(e):void{
    this.query = e.target.value
    this.no_matching_data = `We couldn't find any repository that match your search for ${this.query.italics().bold()}`
    this.search_again = `Please try to search again by using different words`
    this.setupContent(1)
  }
}
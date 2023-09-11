import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public videoOrder: string = '1';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params: Params): void => {
        this.videoOrder = params['sort'] === '2' ? params['sort'] : 1;
      });
  }

  public sort(event: Event): void {
    const { value } = (event.target as HTMLSelectElement);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
      }
    });
  }

}

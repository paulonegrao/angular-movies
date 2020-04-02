import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <nav class="nav">
      <a routerLink="/home" routerLinkActive="active">HOME</a>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <a routerLink="/about" routerLinkActive="active">ABOUT</a>
    </nav>
    <!-- Where router should display a view -->
    <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.component.css"]
})
export class AppComponent {}

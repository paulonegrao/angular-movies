import { Component, Input } from "@angular/core";

@Component({
  selector: "app_child",
  template: `
    <div class="child">
      <table class="tableImage">
        <tr>
          <td class="tdImage">
            <img src="{{ IMAGE_URL }}{{ thePosterPath }}" />
          </td>
        </tr>
        <tr>
          <td class="tdTitle">
            <h3>{{ theTitle }}</h3>
          </td>
        </tr>
        <tr>
          <td class="tdOverview">
            <p>{{ theOverview }}</p>
          </td>
        </tr>
      </table>
    </div>
  `,
  styleUrls: ["./app.component.css"]
})
export class ChildComponent {
  IMAGE_URL = "https://image.tmdb.org/t/p/w185";

  @Input()
  thePosterPath: string;

  @Input()
  theTitle: string;

  @Input()
  theOverview: string;
}

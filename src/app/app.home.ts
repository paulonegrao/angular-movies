// by Paulo Negrao - Nov 2019
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const DAYS_INTERVAL = 30;
const API_KEY = "d2fd45bf27e8640f57760440205d01d8"; // Use v3
const BASE_URL =
  "http://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY;

// Hint: You will need a function to change this URL to
// dynamically modify the start and end date range.
//+ '&primary_release_date.gte=2019-01-01'
//+ '&primary_release_date.lte=2019-02-25'

// Hint: You will want to dynamically change the page number
// and genre number.
//+ '&page=1&with_genres=16';

const BASE_QUERY_GTE = "&primary_release_date.gte=";
const BASE_QUERY_LTE = "&primary_release_date.lte=";
const BASE_QUERY_PAGE = "&page=";
const BASE_QUERY_GENRES = "&with_genres=";

const GENRE_URL =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
  API_KEY +
  "&language=en-US";

@Component({
  template: `
    <div class="header">
      <table class="tableHeader">
        <tr>
          <td>
            <select
              class="select"
              [(ngModel)]="selectedGenreName"
              name="genre"
              #genre="ngModel"
              (change)="onSelectChange($event.target.value)"
            >
              <option
                *ngFor="let genre of _genreArray | keyvalue"
                value="{{ genre.value.id }}"
              >
                {{ genre.value.name }}
              </option>
            </select>
          </td>
          <td class="spacer"></td>
          <td class="navPages">
            <button class="downUp" (click)="onClick('down')">-</button>
          </td>
          <td class="navPages">{{ page }} / {{ total_pages }}</td>
          <td class="navPages">
            <button class="downUp" (click)="onClick('up')">+</button>
          </td>
        </tr>
      </table>
    </div>
    <button class="scroll lScroll" (click)="onClickScroll('left')"><</button>
    <button class="scroll rScroll" (click)="onClickScroll('right')">></button>
    <div
      id="gallery"
      class="gallery"
      style="overflow: scroll; overflow-y: hidden;"
    >
      <table id="tableGallery" class="tableGallery">
        <tr>
          <td *ngFor="let movie of _movieArray">
            <!-- call the child component to handle images -->
            <app_child
              thePosterPath="{{ movie.poster_path }}"
              theTitle="{{ movie.title }}"
              theOverview="{{ movie.overview }}"
            >
            </app_child>
          </td>
        </tr>
      </table>
    </div>
  `,
  styleUrls: ["./app.component.css"]
})
export class HomeComponent {
  _movieArray: Array<any>;
  _genreArray: Array<any>;
  _http: HttpClient;

  gte = "";
  lte = "";
  page = 1;
  total_pages = 0;
  selectedGenreId = 16;
  selectedGenreName = "16";

  // Since we are using a provider above we can receive
  // an instance through an instructor.
  constructor(private http: HttpClient) {
    this._http = http;

    // set up the date range
    let rangeDates = this.getDateRange();
    this.gte = rangeDates[0];
    this.lte = rangeDates[1];
  }

  ngOnInit() {
    this.getGenres();

    //this.initMovies();
    this.getMovies();
  }

  getDateRange() {
    let today = new Date();
    let lte = this.getFormattedDate(today);

    let intervalDaysAgo = today;
    intervalDaysAgo.setDate(intervalDaysAgo.getDate() - DAYS_INTERVAL);
    let gte = this.getFormattedDate(intervalDaysAgo);

    return [gte, lte];
  }

  // Hint.
  // Months and days less than 10 you may want to
  // create some kind of string formater that appends a 0
  // before the day or month number.
  getFormattedDate(dt: Date) {
    // The month count starts at 0 so Janaury is month number 0.
    let year = dt.getFullYear();
    let month = "";
    month = month.concat("0", String(Number(dt.getMonth()) + 1));
    month = month.slice(-2);
    let day = "";
    day = day.concat("0", String(Number(dt.getDate()) + 1));
    day = day.slice(-2);

    return `${year}-${month}-${day}`;
  }

  getMovies() {
    this._http
      .get<any>(
        BASE_URL +
          BASE_QUERY_GTE +
          this.gte +
          BASE_QUERY_LTE +
          this.lte +
          BASE_QUERY_PAGE +
          this.page +
          BASE_QUERY_GENRES +
          this.selectedGenreId
      )
      // Get data and wait for result.
      .subscribe(
        data => {
          data.results = this.removeNullImage(data.results);

          // reset the scroll position when changing genres or pages
          let container = document.getElementById("gallery");
          container.scrollLeft = 0;

          this._movieArray = data.results;

          this.total_pages = data.total_pages;
        },
        error => {
          // Let user know about the error.
          alert(error);
          console.error(error);
        }
      );
  }

  getGenres() {
    this._http
      .get<any>(GENRE_URL)
      // Get data and wait for result.
      .subscribe(
        data => {
          this._genreArray = data.genres;
        },

        error => {
          // Let user know about the error.
          alert(error);
          console.error(error);
        }
      );
  }

  onSelectChange(optionValue) {
    this.selectedGenreId = optionValue;
    // reset to page 1 of changed genre
    this.page = 1;

    this.getMovies();
  }

  // remove objects with image url = null
  removeNullImage(theArray) {
    theArray = theArray.filter(element => {
      return element.poster_path != null;
    });
    return theArray;
  }

  // process the - & + pagination buttons
  onClick(option) {
    if (option == "down" && this.page > 1) {
      this.page--;
      this.getMovies();
    } else if (option == "up" && this.page < this.total_pages) {
      this.page++;
      this.getMovies();
    }
  }

  // process horizontal scroll of movies inside the same page
  onClickScroll(option) {
    let container = document.getElementById("gallery");
    if (option == "left") {
      container.scrollLeft -= this.getWidth();
    } else {
      container.scrollLeft += this.getWidth();
    }
  }

  // to get the browser width to be used when horizontal scrolling
  getWidth() {
    if (self.innerWidth) {
      return self.innerWidth;
    } else if (
      document.documentElement &&
      document.documentElement.clientHeight
    ) {
      return document.documentElement.clientWidth;
    } else if (document.body) {
      return document.body.clientWidth;
    }
    return 0;
  }
}

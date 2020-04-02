import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ChildComponent } from "./app.child";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./app.home";
import { AboutComponent } from "./app.about";
import { PageDefault } from "./app.pagedefault";
import { HttpClientModule } from "@angular/common/http";
import { routing } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    HomeComponent,
    AboutComponent,
    PageDefault
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, routing],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

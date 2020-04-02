import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./app.home";
import { AboutComponent } from "./app.about";
import { PageDefault } from "./app.pagedefault";

const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageDefault }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

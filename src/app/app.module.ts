import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { HomeComponent } from './pages/home/home.component';
import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    WishlistComponent,
    HomeComponent,
    SideNavComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    NgOptimizedImage,
    AuthModule,
  ],
  providers: [provideImageKitLoader('https://ik.imagekit.io/snsljr2ra/')],
  bootstrap: [AppComponent],
})
export class AppModule {}

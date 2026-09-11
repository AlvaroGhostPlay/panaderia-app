import { Component } from '@angular/core';
import { Footer } from '../components_generics/footer/footer';
import { Nadbar } from '../components_generics/nadbar/nadbar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Footer, Nadbar, RouterOutlet],
  selector: 'user',
  templateUrl: './user.html',
})
export class User {}

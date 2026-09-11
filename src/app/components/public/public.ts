import { Component } from '@angular/core';
import { Nadbar } from '../components_generics/nadbar/nadbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../components_generics/footer/footer';

@Component({
  imports: [Nadbar, RouterOutlet, Footer],
  selector: 'public',
  templateUrl: './public.html',
})
export class Public {}

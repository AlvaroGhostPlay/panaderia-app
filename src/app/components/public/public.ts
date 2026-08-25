import { Component } from '@angular/core';
import { Nadbar } from '../components_generics/nadbar/nadbar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Nadbar, RouterOutlet],
  selector: 'public',
  templateUrl: './public.html',
})
export class Public {}

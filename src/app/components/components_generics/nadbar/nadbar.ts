import { Component } from '@angular/core';
import { NadbarModel } from '../../../model/nadbar_model';
import { NadbarService } from '../../../services/nadbar-service';

@Component({
  imports: [],
  selector: 'nadbar-generic',
  templateUrl: './nadbar.html',
})
export class Nadbar {
  nadbars: NadbarModel[] = [];

  constructor(private nadbarService: NadbarService) {}

  ngOnInit(): void {
    this.nadbarService.getNadbarByRole('').subscribe({
      next: (data) => {
        this.nadbars = data;
        console.log(this.nadbars);
      },
    });
  }
}

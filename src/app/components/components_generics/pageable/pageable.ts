import { Component, input, output } from '@angular/core';

@Component({
  selector: 'pageable',
  imports: [],
  templateUrl: './pageable.html',
})
export class Pageable {
  currentPage = input<number>(0);
  totalPages = input<number>(0);

  pageChange = output<number>();

  firstPage() {
    this.pageChange.emit(0);
  }

  previousPage() {
    if (this.currentPage() > 0) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  lastPage() {
    if (this.totalPages() > 0) {
      this.pageChange.emit(this.totalPages() - 1);
    }
  }
}

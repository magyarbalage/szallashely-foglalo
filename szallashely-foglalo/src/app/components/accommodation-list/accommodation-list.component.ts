import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Accommodation } from '../../models/accommodation.model';
import { AccommodationService } from '../../services/accommodation.service';
import { AddAccommodationDialogComponent } from '../add-accommodation-dialog/add-accommodation-dialog.component';
import { ToEuroPipe } from '../../pipes/to-euro.pipe';

@Component({
  selector: 'app-accommodation-list',
  standalone: true,
  imports: [
    CommonModule,
  RouterModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  ToEuroPipe,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  FormsModule
    
  ],
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss']
})
export class AccommodationListComponent implements OnInit {
  accommodations: Accommodation[] = [];
  selectedCategory: string = '';
  maxPrice: number | null = null;

  constructor(
    private accommodationService: AccommodationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accommodationService.getAccommodations().subscribe(data => {
      this.accommodations = data;
    });
  }
  clearFilters(): void {
    this.selectedCategory = '';
    this.maxPrice = null;
    this.loadAll();
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddAccommodationDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accommodationService.addAccommodation(result).then(() => {
          console.log('Szállás hozzáadva!');
        });
      }
    });
  }
    loadAll(): void {
    this.accommodationService.getAccommodations().subscribe(data => {
      this.accommodations = data;
    });
  }

  filterByCategory(): void {
    if (this.selectedCategory) {
      this.accommodationService.getByCategory(this.selectedCategory).subscribe(data => {
        this.accommodations = data;
      });
    } else {
      this.loadAll();
    }
  }

  filterByPrice(): void {
    if (this.maxPrice !== null) {
      this.accommodationService.getAffordable(this.maxPrice).subscribe(data => {
        this.accommodations = data;
      });
    } else {
      this.loadAll();
    }
  }

  sortByPrice(): void {
    this.accommodationService.getSortedByPrice().subscribe(data => {
      this.accommodations = data;
    });
  }

  loadRecent(): void {
    this.accommodationService.getRecent(3).subscribe(data => {
      this.accommodations = data;
    });
  }
}

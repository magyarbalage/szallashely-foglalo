import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

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
    ToEuroPipe
  ],
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss']
})
export class AccommodationListComponent implements OnInit {
  accommodations: Accommodation[] = [];

  constructor(
    private accommodationService: AccommodationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accommodationService.getAccommodations().subscribe(data => {
      this.accommodations = data;
    });
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
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Accommodation } from '../../models/accommodation.model';
import { AccommodationService } from '../../services/accommodation.service';
import { RouterModule } from '@angular/router';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { ToEuroPipe } from '../../pipes/to-euro.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewListComponent } from '../review-list/review-list.component';
import { ReviewFormComponent } from '../review-form/review-form.component';


@Component({
  selector: 'app-accommodation-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, BookingFormComponent, RouterModule,ToEuroPipe,ReviewListComponent,ReviewFormComponent],
  templateUrl: './accommodation-detail.component.html',
  styleUrls: ['./accommodation-detail.component.scss']
})
export class AccommodationDetailComponent implements OnInit {
  accommodation!: Accommodation;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.accommodationService.getAccommodationById(id).subscribe(data => {
        this.accommodation = data;
      });
    }
  }
  onBookingSaved() {
    this.snackBar.open('✅ Foglalás sikeresen elmentve!', 'OK', { duration: 3000 });
  }
 
  refreshReviews(): void {
    
  }
  
}
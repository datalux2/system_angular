import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Camera } from '../cameras';
import { CamerasService } from '../cameras.service';
import $ from 'jquery';
//import { RouterModule/*, ActivatedRoute, */, Router } from '@angular/router';
import { Message } from '../message';
//import { AppModule } from '../app.module';
//import {BrowserModule} from '@angular/platform-browser';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatPaginator, PageEvent/*, MatPaginatorModule*/ } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource/*, MatTableModule*/} from '@angular/material/table';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule,  } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,
            CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    //BrowserModule,
    //BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cameras.component.html',
  styleUrl: './cameras.component.css'
})

export class CamerasComponent {
    subtitle = 'Kamery';

    camerasService: CamerasService = inject(CamerasService);
    
    message: string | null = '';

    message_url = this.router.snapshot.params['id'];

    status: boolean = true;

    displayedColumns = ['lp', 'id', 'name', 'status', 'ip', 'nr_on_plan', 'type_id', 'floor', 'create_datetime', 'update_datetime', 'actions'];
    dataSource!: MatTableDataSource<Camera>;
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    pageSize = 2;
    currentPage = 0;
    isLoading = false;
    totalRows = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    isLoadingDelete = false;

    camerasList: Camera[] = [];
    
    constructor(private router: ActivatedRoute, private route: Router)
    {
        if (this.message_url)
        {
            this.message = this.message_url;
        }
    }

    loadData() {
        this.isLoading = true;
        
        this.camerasService.getAllCameras(this.pageSize, (this.currentPage + 1)).then((camerasList: any) => {
            if (camerasList.status)
            {
                this.camerasList = camerasList.result;
                this.dataSource = new MatTableDataSource(camerasList.result);
                this.totalRows = camerasList.numRows;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                setTimeout(() => {
                    this.paginator.pageIndex = this.currentPage;
                    this.paginator.length = camerasList.numRows;
                });
            }
            else
            {
                if (camerasList.message.sqlMessage)
                {
                    this.message = camerasList.message.sqlMessage;
                }
                else if(camerasList.message.code)
                {
                    this.message = camerasList.message.code;
                }
                this.status = false;
            }
            this.isLoading = false;
        }).catch((error) => {
            this.isLoading = false;
            this.totalRows = 0;
            this.message = 'Błąd połączenia serwera NodeJS';
            this.status = false;
        });
        
    }
    
    ngOnInit(): void {
        //Load initial data
        this.loadData();
        
    }

    pageChanged(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.loadData();
    }

    /*applyFilter(event: Event) {
        var filterValue = (event.target as HTMLInputElement).value;
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }*/

    async clickHandler(id: number)
    {
        this.isLoadingDelete = true;
        
        if (window.confirm('Czy jesteś pewien usunąć tą kamerę ?'))
        {
            this.isLoadingDelete = true;
        
            this.camerasService.submitDeleteApplication(id).then((message: Message) => {
                this.message = message.message;
                this.status = message.status;
                this.isLoadingDelete = false;
                if(this.status)
                {
                    this.route.navigate(['/kamery', this.message]).then(() => {
                        window.location.reload();
                    });
                }
            }).catch((error) => {
                this.message = 'Błąd połączenia serwera NodeJS';
                this.status = false;
                this.isLoadingDelete = false;
            });
        }
    }
}

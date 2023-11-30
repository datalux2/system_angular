import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CamerasService } from '../cameras.service';
import { Message } from '../message';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera } from '../cameras';

@Component({
  selector: 'app-cameras-add-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cameras-add-edit.component.html',
  styleUrl: './cameras-add-edit.component.css'
})
export class CamerasAddEditComponent {
    subtitle_add = 'Formularz dodawania kamery';

    subtitle_edit = 'Formularz aktualizacji kamery';
    
    submitted = false;

    applyForm: FormGroup;
    
    camerasService: CamerasService = inject(CamerasService);
    
    camera: Camera | null = null;

    id = this.route.snapshot.params['id'];
    
    message: string | null = '';
    
    status: boolean = true;

    form_view: boolean = true;

    isLoading: boolean = false;

    isLoadingAdd: boolean = false;

    isLoadingEdit: boolean = false;
    
    constructor(private route: ActivatedRoute, public fb: FormBuilder, private router: Router)
    {   
        this.applyForm = this.fb.group({
            name: ['', Validators.required],
            status: ['', Validators.required],
            ip: ['', [Validators.required, Validators.pattern('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
            nr_on_plan: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
            type_id: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
            floor: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]]
        });
        
        if(this.id !== undefined)
        {
            this.isLoading = true;
            
            this.camerasService.getCameraById(this.id).then((camera: any) => {
                if(Object.keys(camera).length === 0)
                {
                    this.camera = camera;
                }
                else if(typeof camera === 'object')
                {
                    if(camera.status)
                    {
                        if (camera.result.length == 1)
                        {
                            this.camera = camera.result[0] as Camera;
                            this.applyForm.value['name'] = this.camera.name;
                            this.applyForm = this.fb.group({
                                name: [this.camera.name, Validators.required],
                                status: [this.camera.status, Validators.required],
                                ip: [this.camera.ip, [Validators.required, Validators.pattern('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
                                nr_on_plan: [this.camera.nr_on_plan, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
                                type_id: [this.camera.type_id, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
                                floor: [this.camera.floor, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]]
                            });
                        }
                    }
                    else
                    {
                        if (camera.message.sqlMessage)
                        {
                            this.message = camera.message.sqlMessage;
                        }
                        else if(camera.message.code)
                        {
                            this.message = camera.message.code;
                        }
                        this.status = false;
                        this.form_view = false;
                    }
                }

                this.isLoading = false;

            }).catch((err) => {
                this.message = 'Błąd połączenia serwera NodeJS'; 
                this.status = false; 
                this.form_view = false;
                this.isLoading = false;
            });
        }
    }
    
    submitAddApplication()
    {
        this.submitted = true;
        
        if (this.applyForm.valid)
        {
            this.isLoadingAdd = true;
        
            var result = this.camerasService.submitAddApplication(
                this.applyForm.value.name ?? '',
                this.applyForm.value.status ?? '',
                this.applyForm.value.ip ?? '',
                this.applyForm.value.nr_on_plan ?? '',
                this.applyForm.value.type_id ?? '',
                this.applyForm.value.floor ?? '',
            ).then((result: Message) => {
                this.message = result.message;
                if (!result.status)
                {
                    this.status = false;
                }
                else
                {
                    this.status = true;
                    this.router.navigate(['kamery', this.message]);
                }
                this.isLoadingAdd = false;
            }).catch((error) => { 
                this.message = 'Błąd połączenia z serwerem NodeJS';
                this.status = false; 
                this.isLoadingAdd = false;
            });  
        }
    }
    
    submitEditApplication()
    {
        this.submitted = true;
        
        if (this.applyForm.valid)
        {
            this.isLoadingEdit = true;
            
            this.camerasService.submitEditApplication(
                this.id,
                this.applyForm.value.name ?? '',
                this.applyForm.value.status ?? '',
                this.applyForm.value.ip ?? '',
                this.applyForm.value.nr_on_plan ?? '',
                this.applyForm.value.type_id ?? '',
                this.applyForm.value.floor ?? '',
            ).then((result: Message) => {
                this.message = result.message;
                if (!result.status)
                {
                    this.status = false;
                }
                else
                {
                    this.status = true;
                    this.router.navigate(['kamery', this.message]);
                }
                this.isLoadingEdit = false;
            }).catch((error) => { 
                this.message = 'Błąd połączenia z serwerem NodeJS';
                this.status = false; 
                this.isLoadingEdit = false;
            });  
        }
    }
}

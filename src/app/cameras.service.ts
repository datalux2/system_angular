import { Injectable } from '@angular/core';
import { Camera } from './cameras';
import $ from 'jquery';
import {Router} from "@angular/router"
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  main_url = 'http://localhost:8000';
  
  url = this.main_url + '/kamery';
  
  url_add_edit = this.main_url + '/kamery/dodaj_aktualizuj';

  url_edit = this.main_url + '/kamery/edytuj';

  delete_url = this.main_url + '/kamery/usun';

  constructor(private router: Router) { }

  async getAllCameras(pageSize: number, pageNumber: number): Promise<any>
  {
    const data = await fetch(this.url + '/' + pageNumber.toString() + '/' + pageSize.toString());
    return await data.json() ?? [];
  }

  async getCameraById(id: number): Promise<any>
  {
    const data = await fetch(`${this.url_edit}/${id}`);
    return await data.json() ?? {};
  }

  async submitAddApplication(name: string, status: string, ip: string, nr_on_plan: string, type_id: string, floor: string):Promise<Message>
  {
    var status2 = true;
    var message = '';
    await $.post({url: this.url_add_edit, data: {name: name, status: status, ip: ip, nr_on_plan: nr_on_plan, type_id: type_id, floor: floor}, dataType: "json"}).done(function(data) {
        status2 = data.status;
        if (status2)
        {
            message = data.message;
        }
        else
        {
            if (data.message.sqlMessage)
            {
                message = data.message.sqlMessage;
            }
            else if(data.message.code)
            {
                message = data.message.code;
            }
            else if(data.message)
            {
                message = data.message;
            }
        }
    }).promise();
    return {message: message, status: status2};
  }

  async submitEditApplication(id: number, name: string, status: string, ip: string, nr_on_plan: string, type_id: string, floor: string): Promise<Message>
  {
    var status2 = true;
    var message = '';
    await $.post({url: this.url_add_edit, data: {id: id, name: name, status: status, ip: ip, nr_on_plan: nr_on_plan, type_id: type_id, floor: floor}, dataType: "json"}).done(function(data) {
        status2 = data.status;
        if (status2)
        {
            message = data.message;
        }
        else
        {
            if (data.message.sqlMessage)
            {
                message = data.message.sqlMessage;
            }
            else if(data.message.code)
            {
                message = data.message.code;
            }
            else if(data.message)
            {
                message = data.message;
            }
        }
    }).promise();
    return {message: message, status: status2};
  }
    async submitDeleteApplication(id: Number):Promise<Message>
    {
        var status = true;
        var message = '';
        await $.post({url: this.delete_url, data: {id: id}, dataType: 'json'}).done(function(data) {
            status = data.status;
            if (status)
            {
                message = data.message;
            }
            else
            {
                if (data.message.sqlMessage)
                {
                    message = data.message.sqlMessage;
                }
                else if(data.message.code)
                {
                    message = data.message.code;
                }
                else if(data.message)
                {
                    message = data.message;
                }
            }
        }).promise();
        return {message: message, status: status};
    }
}

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CamerasComponent } from './cameras/cameras.component';
import { CamerasAddEditComponent } from './cameras-add-edit/cameras-add-edit.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'System demonstracyjny wejść i wyjść w obiektach handlowych'
  },
  {
    path: 'kamery',
    component: CamerasComponent,
    title: 'System demonstracyjny wejść i wyjść w obiektach handlowych - Kamery'
  },
  {
    path: 'kamery/dodaj',
    component: CamerasAddEditComponent,
    title: 'System demonstracyjny wejść i wyjść w obiektach handlowych - Formularz dodawania kamery'
  },
  {
    path: 'kamery/:id',
    component: CamerasComponent,
    title: 'System demonstracyjny wejść i wyjść w obiektach handlowych - Kamery'
  },
  {
    path: 'kamery/edytuj/:id',
    component: CamerasAddEditComponent,
    title: 'System demonstracyjny wejść i wyjść w obiektach handlowych - Formularz aktualizacji kamery'
  }
];

export default routeConfig;

import { Routes } from '@angular/router';
import { LensManualComponent } from './features/home/components/lens-manual/lens-manual.component';
import { AdminComponent } from './features/admin/admin.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/glasmanual',
        pathMatch: 'full',
    },
    {
        path: 'glasmanual',
        component: LensManualComponent,
        title: 'Lens Manual'
    },
    {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin'
    }
];

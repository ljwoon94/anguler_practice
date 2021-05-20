import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';


//path가 뭐일때 컴포넌트가 여기다
const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent}
];
  
export default RouterModule.forRoot(routes);

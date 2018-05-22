import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: '', loadChildren: './posts/posts.module#PostsModule' },
  { path: '**', redirectTo: '/error', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadChildren: () =>
      import('./components/home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'register', loadChildren: () =>
      import('./components/register/register.module').then(module => module.RegisterModule)
  },
  {
    path: 'cookies-policy', loadChildren: () =>
      import('./components/cookies-policy/cookies-policy.module').then(module => module.CookiesPolicyModule)
  },
  {
    path: 'aboutUs', loadChildren: () =>
      import('./components/aboutUs/aboutUs.module').then(module => module.AboutUsModule)
  },
  {
    path: 'blog', loadChildren: () =>
      import('./components/blog/blog.module').then(module => module.BlogModule)
  },
  {
    path: 'blog/:blog', loadChildren: () =>
      import('./components/blog-post/blog-post.module').then(module => module.BlogPostModule)
  },
  {
    path: 'menu', loadChildren: () =>
      import('./components/menu/menu.module').then(module => module.MenuModule)
  },
  {
    path: 'forgotPassword', loadChildren: () =>
      import('./components/forgotPassword/forgotPassword.module').then(module => module.ForgotPasswordModule)
  },
  {
    path: 'changePassword/:id', loadChildren: () =>
      import('./components/changePassword/changePassword.module').then(module => module.ChangePasswordModule)
  },
  {
    path: 'profile', loadChildren: () =>
      import('./components/profile/profile.module').then(module => module.ProfileModule)
  },
  {
    path: 'demo', loadChildren: () =>
      import('./components/customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path: 'show', loadChildren: () =>
      import('./components/ranking/ranking.module').then(module => module.RankingModule)
  },
  {
    path: 'show/:id', loadChildren: () =>
      import('./components/customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path: 'contact', loadChildren: () =>
      import('./components/contact/contact.module').then(module => module.ContactModule)
  },
  {
    path: 'faq', loadChildren: () =>
      import('./components/faq/faq.module').then(module => module.FaqModule)
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

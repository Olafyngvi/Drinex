import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import { EditProductPhotosComponent } from './edit-product-photos/edit-product-photos.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { CarouselsComponent } from './carousels/carousels.component';

@NgModule({
  declarations: [AdminComponent, EditProductComponent, EditProductFormComponent, EditProductPhotosComponent, CarouselsComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule, RichTextEditorModule],
})
export class AdminModule {}

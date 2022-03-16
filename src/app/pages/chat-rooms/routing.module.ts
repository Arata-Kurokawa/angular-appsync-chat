import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatRoomsComponent } from './chat-rooms.component'
import { ChatRoomComponent } from '@app/pages/chat-rooms/room/chat-room.component'

const routes: Routes = [
  {
    path: '',
    component: ChatRoomsComponent,
    children: [
      { path: 'r/:id', component: ChatRoomComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoomRoutingModule {

}

import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { ChatRoom } from '@app/models/chat-room'

import { APIServer } from '@app/API.server'
import { Router } from '@angular/router'

@Component({
  templateUrl: './chat-rooms.component.html',
  styleUrls:   ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit {
  chatRooms$!: Observable<ChatRoom[]>

  constructor(
    private api: APIServer,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.chatRooms$ = of([
      { id: 1, name: "room1" },
      { id: 2, name: "room2" },
      { id: 3, name: "room3" },
      { id: 4, name: "room4" },
    ])
  }

  onClickRoom(chatRoomId: number) {
    this.router.navigate([`/chat-rooms/r/${chatRoomId}`])
  }
}

import { Component, OnInit } from '@angular/core'
import { from, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { ChatRoom } from '@app/models/chat-room'

import { APIServer } from '@app/API.server'

const GET_CHAT_ROOMS =
  `query GetChatRooms {
    chatRooms {
      id
      name
    }
  }`

@Component({
  templateUrl: './chat-rooms.component.html',
  styleUrls:   ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit {
  chatRooms$!: Observable<ChatRoom[]>

  constructor(
    private api: APIServer
  ) {
  }

  ngOnInit() {
    // online
    // this.chatRooms$ = from(this.api.query(GET_CHAT_ROOMS)).pipe(map(response => response.data.chatRooms))

    // offline
    this.chatRooms$ = of([
      { id: 1, name: "room1" },
      { id: 2, name: "room2" },
      { id: 3, name: "room3" },
      { id: 4, name: "room4" },
    ])
  }
}

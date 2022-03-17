import { Component, OnDestroy, OnInit } from '@angular/core'

import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { APIServer } from '@app/API.server'
import { ChatMessage } from '@app/models/chat-message'

const GET_CHAT_MESSAGES =
  `query GetChatMessage($chatRoomId: Int!) {
    chatMessages(chatRoomId: $chatRoomId) {
      id
      chatRoomId
      message
    }
  }`

const ADD_CHAT_MESSAGE =
  `mutation AddChatMessage($chatRoomId: Int!, $message: String!) {
    addChatMessage(chatRoomId: $chatRoomId, message: $message) {
      id
      chatRoomId
      message
    }
  }`

const ON_ADD_CHAT_MESSAGE =
  `subscription OnAddChatMessage($chatRoomId: Int!) {
    onAddChatMessage(chatRoomId: $chatRoomId) {
      id
      chatRoomId
      message
    }
  }`

@Component({
  templateUrl: './chat-room.component.html',
  styleUrls:   ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  chatRoomId!: number

  chatMessages$ = new BehaviorSubject<ChatMessage[]>([])
  messageForm = new FormControl()

  private subscription: Subscription = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private api: APIServer
  ) {
  }

  ngOnInit() {
    this.chatRoomId = Number(this.route.snapshot.params["id"])

    this.api.query(GET_CHAT_MESSAGES, { chatRoomId: this.chatRoomId })
      .then(response => {
        this.chatMessages$.next(response.data.chatMessages)
        this.subscription.add(
          this.api.subscription(ON_ADD_CHAT_MESSAGE, { chatRoomId: this.chatRoomId })
            .subscribe(response => {
              const current = this.chatMessages$.value
              const added = [...current, response.value.data.onAddChatMessage]
              this.chatMessages$.next(added)
            })
        )
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  addMessage() {
    const message = this.messageForm.value
    if (!!message) {
      this.api.mutation(
        ADD_CHAT_MESSAGE,
        {
          chatRoomId: this.chatRoomId,
          message: message
        }
      ).then()
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core'

import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { APIServer } from '@app/API.server'
import { ChatMessage } from '@app/models/chat-message'

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

  private subscription: Subscription = new Subscription()
  private appsyncSubscription: Subscription = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private api: APIServer
  ) {
  }

  ngOnInit() {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.chatRoomId = Number(params["id"])
        this.chatMessages$.next([])

        this.appsyncSubscription.unsubscribe()
        this.appsyncSubscription = new Subscription()

        this.appsyncSubscription.add(
          this.api.subscription(ON_ADD_CHAT_MESSAGE, { chatRoomId: this.chatRoomId })
            .subscribe(response => {
              const onAddChatMessage = response?.value?.data?.onAddChatMessage
              if (onAddChatMessage) {
                const current = this.chatMessages$.value
                const added = [...current, response.value.data.onAddChatMessage]
                this.chatMessages$.next(added)
              }
            })
        )
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}

import {
  observable,
  computed,
  action,
} from 'mobx'

export class AppState {
  @observable count = 0

  @observable name = 'hj'

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(value) {
    this.name = value
  }
}

const appState = new AppState()

setInterval(() => {
  appState.add()
}, 10000)

export default appState

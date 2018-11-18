import {
  observable,
  // computed,
  action,
  extendObservable,
} from 'mobx'
import { get } from '../util/http'
import { topicSchema } from '../util/variable-define';

const createTopic = (data) => {
  return Object.assign({}, topicSchema, data)
}
class Topic {
  constructor(data) {
    extendObservable(this, data)
  }

  @observable syncing = false
}

class TopicStore {
  @observable syncing

  @observable topics

  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @action fetchTopics() {
    return new Promise((resolve, reject) => {
      this.syncing = true
      get('/topics', {
        mdrender: false,
      }).then((resp) => {
        console.log('resp', resp)
        if (resp.success) {
          resp.data.forEach((topic) => {
            this.addTopic(topic)
          })
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      }).catch((err) => {
        reject(err)
        this.syncing = false
      })
    })
  }
}

export default TopicStore

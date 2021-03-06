import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconect(): Promise<void> {
    await this.client.close()
    this.cliente = null
  },
  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map(collection: any): any {
    const { _id, ...collectiontWithoutId } = collection
    return Object.assign({}, collectiontWithoutId, { id: _id })
  }
}

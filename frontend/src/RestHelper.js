const URL = 'http://localhost:3010'

export default class RestHelper {
  static async getAll(text) {
    return await fetch(`${URL}/api/translate?features=jmdict,kanji&text=${text}`)
  }
}
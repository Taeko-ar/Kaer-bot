import axios from "axios"

class ApiCalls {
  static async queryNWDB({ item }) {
    const url = `https://nwdb.info/db/search/${item}`

    const query = await axios.get(url, { headers: { 'User-Agent': 'PostmanRuntime/7.29.0' } })
    const response = query.data.data[0]


    if (!response || response.type != "item" ) return false;
    return { id: response.id }
  }

  static async queryNWMP({ item }) {
    const nwdbData = await this.queryNWDB({ item })

    if (!nwdbData) return false;

    const url = `https://nwmarketprices.com/0/16?cn_id=${nwdbData.id}`

    const { ...query } = await axios.get(url, { headers: { 'User-Agent': 'PostmanRuntime/7.29.0' } })

    const lowest_price = query.data.recent_lowest_price
    const last_update = query.data.last_checked
    const price_change = query.data.price_change
    const avg_price = query.data.avg_graph_data
    const detail_view = query.data.detail_view
    const item_name = query.data.item_name
    const item_quantity = query.data.num_listings
    const item_id = query.data.nwdb_id

    if (!item_name) return false;

    return { lowest_price, last_update, price_change, avg_price, item_name, item_quantity, item_id, detail_view }
  }
}

export default ApiCalls
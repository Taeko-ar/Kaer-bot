import ApiCalls from "services/user/api-calls";

class NwmpService {

    static async getItemPrice({ item }) {
        const data = await ApiCalls.queryNWMP({ item })

        if (!data) return false;
        
        const item_img_name = data.item_id
        const price_change = /(?<=">).*?(?=<)/.exec(data.price_change)
        const avg_price = data.avg_price[0]
        const max_price = data.detail_view.at(-1)
        const items_published = data.item_quantity.at(-1);
        const nwdb_link = `https://nwdb.info/db/item/${item_img_name}`
        
        const img = `https://cdn.nwdb.info/db/images/live/v8/icons/items/resource/${item_img_name}.png`

        return { img,
            price_change,
            avg_price,
            item_name: data.item_name,
            items_published,
            last_update: data.last_update,
            lowest_price: data.lowest_price,
            max_price: max_price[1],
            nwdb_link }
    }
}
export default NwmpService
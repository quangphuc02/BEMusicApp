import { countFavoriteMd, getListFavoriteMd } from "@/db/models/favoriteSchema"


export const songFavoriteRp = async (list, userId) => {

    const favorites = await getListFavoriteMd({ userId })
    const songIds = favorites.map(f => f.songId.toString())

    const countFavorite = async (songId) => {
        return await countFavoriteMd({ songId })
    }

    return list.map(d => {
        const likes = countFavorite(d.songId)
        if (songIds.includes(d._id.toString())) {
            return { ...d, favorite: 1, likes }
        }
        return { ...d, likes }
    })
}
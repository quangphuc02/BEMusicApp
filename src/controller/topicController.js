import {
    getListTopicMd,
    addTopicMd,
    getDetailTopicMd,
    countTopicMd,
    updateTopicMd,
    deleteTopicMd,
} from '../db/models/topicSchema'
import { ArrayObjectId, ObjectId, String, Date, Number, validation } from '../config/joiValid';



export const addTopic = async (req, res, next) => {
    const { name } = req.body
    const valid = {
        name: String.required(),
    };

    if (validation(req.body, valid, res)) return;

    let where = { name }

    const data = await addTopicMd(where)

    return res.json({ data, status: true, mess: "Thêm dữ liệu thành công!" })

}
export const getListTopics = async (req, res, next) => {
}
export const countTopics = async (req, res, next) => {
}
export const getDetailTopic = async (req, res, next) => {
}
export const deleteTopic = async (req, res, next) => {
}
export const updateTopic = async (req, res, next) => {
}

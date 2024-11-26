import axios from "axios"
import { LANGUAGE_VERSIONS } from "./language"

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})

export const executeCode = async (language, sourceCode, input = "") => {
    const res = await API.post('/execute', {
        language,
        version: LANGUAGE_VERSIONS[language],
        files: [
            {
                content: sourceCode
            }
        ],
        stdin: input
    })
    return res.data
}
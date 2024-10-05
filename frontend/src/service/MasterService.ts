import axios from "axios"
import { BASE_URL } from "../config/constant"

class MasterService {
    MASTER_URL = BASE_URL
    async post(url: string, data: any) {
        const response = await axios.post(this.MASTER_URL + url, data)
        return response
    }
}

const service = new MasterService()
export default service
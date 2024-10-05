import MasterService from "./MasterService";

class CommonService {
    executeClientCode(params: any) {
        return MasterService.post('/execute', params)
    }
}
const service = new CommonService()
export default service
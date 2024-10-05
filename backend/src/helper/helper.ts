import { exec } from 'child_process';
import * as fs from 'fs';

class Helper {
    handleExecute(params: any) {
        return new Promise(async (resolve, reject) => {
            try {
                let { data, ip } = params
                let fileName = "files/" + Date.now() + "_" + ip.toString() + '.js'
                
                if (!fs.existsSync('files')){
                    fs.mkdirSync('files');
                }

                fs.writeFileSync(fileName, data)
                exec(`node ${fileName}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error executing file: ${error}`);
                        return resolve({
                            error: true,
                            data: error?.stack
                        });
                    }

                    if (stderr) {
                        console.error(`Error output: ${stderr}`);
                        return resolve({
                            error: true,
                            data: stderr
                        })
                    }
                    console.log(`Output: ${stdout}`);
                    return resolve({
                        error: false,
                        data: stdout
                    })

                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default new Helper()
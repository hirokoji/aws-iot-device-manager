import * as AWS from 'aws-sdk';
import {mkdirSync} from 'fs';
import * as fs from 'fs';
import {join} from 'path';

export class AWSIoTManager { private iot: AWS.Iot;

    constructor(region: string) {
        this.iot = new AWS.Iot({region: region});
    }

    public async createDevice(deviceName: string) {

        const dirPath = join(__dirname, '..', 'devices', deviceName);
        const result = await this.createDirectory(dirPath, deviceName);
        if(result instanceof Error){ return result }
        const certArn = await this.createKeysAndCertificateAsFile(dirPath, deviceName)

    }

    private async createKeysAndCertificateAsFile(dirPath: string, deviceName: string): Promise<string|Error>{

        const privateKeyFilePath =join(dirPath, `${deviceName}.private.key`);
        const certFilePath = join(dirPath, `${deviceName}.cert.pem`);
        const publicKeyFilePath = join(dirPath, `${deviceName}.public.key`);
        const arnFilePath = join(dirPath, `${deviceName}.cert.arn.txt`);

        const response = await this.iot.createKeysAndCertificate({setAsActive: true}).promise();
        try {

            await Promise.all([
                    fs.promises.writeFile(privateKeyFilePath, response.keyPair?.PrivateKey),
                    fs.promises.writeFile(publicKeyFilePath, response.keyPair?.PublicKey),
                    fs.promises.writeFile(certFilePath, response.certificatePem),
                    fs.promises.writeFile(arnFilePath, response.certificateArn)
                ]
            );
        } catch (err) {
            return err;
        }

        if(response.certificateArn){
            return response.certificateArn
        }else{
            return new Error('Unexpected error');
        }
    }

    private async createDirectory(dirPath: string ,deviceName: string): Promise<boolean|Error> {
        try{
            mkdirSync(dirPath, {recursive: true});
        } catch (err) {
            return err;
        }
        return true;
    }
}
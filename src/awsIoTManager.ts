import * as AWS from 'aws-sdk';
import {mkdirSync} from 'fs';
import * as fs from 'fs';
import {join} from 'path';

export class AWSIoTManager { private iot: AWS.Iot;

    constructor(region: string) {
        this.iot = new AWS.Iot({region: region});
    }

    public async createDevice(deviceName: string) {

        /* Under maintenace*/
        // const certsManagePath = join(__dirname, '..', 'devices', deviceName, 'certs');
        // const result = await this.createDirectory(deviceName, certsManagePath);
        // if(result instanceof Error){ return result }
        //
        // const certArn = await this.createKeysAndCertificateAsFile(certsManagePath);
        // console.log('certArn:', certArn);

    }

    private async createPolicy(deviceName: string) {
    }

    public async createThing(deviceName:string): Promise<AWS.Iot.Types.CreateThingResponse>{
        const response = await this.iot.createThing({thingName: deviceName}).promise();
        return response;
    }

    public async createKeysAndCertificateAsFile(deviceName: string, certsPath?: string): Promise<string|Error>{
        if(certsPath === undefined){
            certsPath = join(__dirname, '..', 'devices', deviceName, 'certs');
        }

        const response = await this.iot.createKeysAndCertificate({setAsActive: true}).promise();
        const prefixArn = response?.certificateArn?.split('/')[1].slice(0,10);
        if(prefixArn === undefined){
            return new Error(`Couldn't call AWS API properly `);
        }

        const certPath = join(certsPath, prefixArn);
        const result = await this.createDirectory(certPath);
        if(result instanceof Error){ return result }

        const privateKeyFilePath =join(certPath, `${prefixArn}.private.key`);
        const certFilePath = join(certPath, `${prefixArn}.cert.pem`);
        const publicKeyFilePath = join(certPath, `${prefixArn}.public.key`);
        const arnFilePath = join(certPath, `${prefixArn}.cert.arn.txt`);

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

    private async createDirectory(dirPath: string): Promise<boolean|Error> {
        try{
            mkdirSync(dirPath, {recursive: true});
        } catch (err) {
            return err;
        }
        return true;
    }
}
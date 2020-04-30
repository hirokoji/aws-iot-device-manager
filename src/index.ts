#!/usr/bin/env node

import { AWSIoTManager } from './awsIoTManager';

const main = async () => {
    const iotManager = new AWSIoTManager('ap-northeast-1');
    const deviceName = 'hkojimaTestDevice';
    const certArn = await iotManager.createKeysAndCertificateAsFile(deviceName)
    console.log(certArn);
}

main();

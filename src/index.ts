#!/usr/bin/env node

import { AWSIoTManager } from './awsIoTManager';

const iotManager = new AWSIoTManager('ap-northeast-1');
const deviceName = 'hkojimaTestDevice';
const certArn = iotManager.createKeysAndCertificateAsFile(deviceName)
console.log(certArn);;



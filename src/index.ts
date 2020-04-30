#!/usr/bin/env node

import { AWSIoTManager } from './awsIoTManager';

const iotManager = new AWSIoTManager('ap-northeast-1');
const deviceName = 'myFirstDevice';
iotManager.createDevice(deviceName);


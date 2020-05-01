# aws-iot-device-manager

This script help your aws iot device management.

## Install

```shell script
npm install aws-iot-device-manager
```

## Usage

You can create device from typescript side.
```typescript
import { AWSIoTManager } from 'aws-iot-manager';

const iotManager = new AWSIoTManager();
const deviceName = 'myFirstDevice';
iotManager.createDevice(deviceName);

```

IoT device certification and keys will be created under 


```shell script

$ ls devices/myFirstDevice

myFirstDevice.private.key
myFirstDevice.cert.pem
myFirstDevice.public.key
myFirstDevice.cert.arn.txt

```



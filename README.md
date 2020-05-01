# aws-iot-device-manager

This script help your aws iot device management.

## Install

```shell script
npm install aws-iot-device-manager
```

## Usage


### 1.1 Create keys and certs for the device
```typescript
import {AWSIoTManager} from 'aws-iot-device-manager';

const main = async () =>{

    const region = 'ap-northeast-1';
    const manager = new AWSIoTManager(region);
    const deviceName = 'myDevice'
    const certArn = await manager.createKeysAndCertificateAsFile(deviceName)
    console.log(certArn);

}

main();
```

IoT device certification and keys will be created below directory.

```shell script

$ ls node_modules/aws-iot-device-manager/devices/myDevice/certs/xxxxxxxxxx
xxxxxxxxxx.cert.arn.txt 
xxxxxxxxxx.cert.pem     
xxxxxxxxxx.private.key  
xxxxxxxxxx.public.key
```



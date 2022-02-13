/* eslint-disable @typescript-eslint/no-explicit-any */
import { error } from 'electron-log';
import escpos from 'escpos';
import * as USB from 'escpos-usb';

const printerAdapter = async (data: any) => {
  try {
    const device = await USB.getDevice();
    const options = { width: 80 };
    const printer = new escpos.Printer(device, options);

    device.open(() => {
      printer.raw(data).flush();
      // device.write(data);
    });

    return true;
  } catch (err) {
    error(err);
    return Promise.reject(err);
  }
};

export default printerAdapter;

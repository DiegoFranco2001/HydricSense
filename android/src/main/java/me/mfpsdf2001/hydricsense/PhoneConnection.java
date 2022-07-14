package me.mfpsdf2001.hydricsense;

import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Context;
import android.widget.Toast;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

public class PhoneConnection {

    private BluetoothAdapter bluetoothAdapter;
    private BluetoothSocket bluetoothSocket;
    private Set<BluetoothDevice> pairedDevices;
    private boolean successfulConnection;
    private final String targetDeviceBT = "HC-05";
    private String deviceAddress = "";
    private Context context;
    static final UUID myUUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");

    public PhoneConnection (BluetoothAdapter bluetoothAdapter, Context context) {
        this.bluetoothAdapter = bluetoothAdapter;
        this.context = context;
    }

    private boolean isBluetoothReady() {
        return !(this.bluetoothAdapter == null || !this.bluetoothAdapter.isEnabled());
    }

    public void messageSender (String message) {
        Toast.makeText(context.getApplicationContext(), message, Toast.LENGTH_LONG).show();
    }

    /**
     * Get device bluetooth paired devices, find the HC-05 and connect to it
     */
    @SuppressLint("MissingPermission")
    private void inferPairedDevice() {
        pairedDevices = bluetoothAdapter.getBondedDevices();

        if (pairedDevices.size() > 0) {
            for (BluetoothDevice pDevices : pairedDevices) {
                if (pDevices.getName().equals(targetDeviceBT)) {
                    this.deviceAddress = pDevices.getAddress();
                    break;
                }
            }
        } else {
            messageSender("Ingrese a ajustes de bluetooth y vincule su teléfono con el dispositivo (HC-05).");
        }
    }

    public void makeConnection () {
        if (isBluetoothReady()){
            inferPairedDevice();

            if (deviceAddress.equals(""))
                messageSender("Por favor verifique que el dispositivo de medición esté conectado.");
            else
                connect();
        } else {
            messageSender("Por favor, habilite el Bluetooth.");
        }
    }

    public void disconnect () {
        try {
            bluetoothSocket.close();
        } catch (IOException exception) {
            messageSender("LA CONEXIÓN NO PUDO SER CERRADA: " + exception);
        }
    }

    public void sendToDevice (String msg) {
        try {
            bluetoothSocket.getOutputStream().write(msg.getBytes());
        } catch (IOException exception) {
            messageSender("Error durante la transmisión, por favor encienda el dispositivo.");
            successfulConnection = false;
        }
    }

    /**
     * TRIES TO CONNECT TO DEVICE
     */
    @SuppressLint("MissingPermission")
    private void connect() {
        try {
            BluetoothDevice device = bluetoothAdapter.getRemoteDevice(deviceAddress);
            this.bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(myUUID);
            this.bluetoothAdapter.cancelDiscovery();
            this.bluetoothSocket.connect();
            this.successfulConnection = true;
        } catch (IOException exception) {
            messageSender("Por favor encienda el dispositivo.");
        }
    }

    public boolean isSuccessfulConnection() {
        return this.successfulConnection;
    }
}

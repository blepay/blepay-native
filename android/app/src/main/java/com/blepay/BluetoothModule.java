package com.blepay; // replace your-app-name with your app’s name

import android.content.ClipboardManager;
import android.util.Log;
import android.widget.Toast;

import com.facebook.fbreact.specs.NativeClipboardSpec;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.clipboard.ClipboardModule;
import com.inuker.bluetooth.library.BluetoothClient;
import com.inuker.bluetooth.library.beacon.Beacon;
import com.inuker.bluetooth.library.search.SearchRequest;
import com.inuker.bluetooth.library.search.SearchResult;
import com.inuker.bluetooth.library.search.response.SearchResponse;


public class BluetoothModule extends ReactContextBaseJavaModule {

    public static final String NAME = "Bluetooth";

    private BluetoothClient mClient;

    BluetoothModule(ReactApplicationContext context) {
        super(context);
        mClient = new BluetoothClient(context);
    }

    private BluetoothClient getBluetoothClient() {
        return mClient;
    }

    // add to CalendarModule.java
    @Override
    public String getName() {
        return BluetoothModule.NAME;
    }

    @ReactMethod
    public void createCalendarEvent(String name, String location) {
        Log.d("CalendarModule", "Create event called with name: " + name
                + " and location: " + location);
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @ReactMethod
    public boolean support() {
        return mClient.isBleSupported();
    }

    @ReactMethod
    public void open() {
        if (!mClient.isBluetoothOpened()) {
            mClient.openBluetooth();
        }
    }

    @ReactMethod
    public void close() {
        if (mClient.isBluetoothOpened()) {
            mClient.closeBluetooth();
        }
    }

    @ReactMethod
    public void scan(Callback callback) {
        SearchRequest request = new SearchRequest.Builder()
                .searchBluetoothLeDevice(3000, 3)   // 先扫BLE设备3次，每次3s
                .searchBluetoothClassicDevice(5000) // 再扫经典蓝牙5s
                .searchBluetoothLeDevice(2000)      // 再扫BLE设备2s
                .build();

        mClient.search(request, new SearchResponse() {
            @Override
            public void onSearchStarted() {

            }

            @Override
            public void onDeviceFounded(SearchResult device) {
                Beacon beacon = new Beacon(device.scanRecord);
                System.out.println(String.format("beacon for %s\n%s", device.getAddress(), beacon.toString()));
                callback.invoke("6666");
            }

            @Override
            public void onSearchStopped() {

            }

            @Override
            public void onSearchCanceled() {

            }
        });
    }

}
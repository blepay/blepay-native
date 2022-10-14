package com.blepay; // replace com.your-app-name with your app’s name

import com.example.bluetoothlechat.bluetooth.ChatServer;
import com.example.bluetoothlechat.bluetooth.Message;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;

import android.bluetooth.BluetoothAdapter;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Handler;

import androidx.annotation.Nullable;
import androidx.lifecycle.Observer;

import android.bluetooth.le.BluetoothLeScanner;

import android.Manifest;
import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;

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


public class CalendarModule extends ReactContextBaseJavaModule {

    public static final String NAME = "Bluetooth";

    private BluetoothClient mClient;

    private BluetoothManager bluetoothManager;

    private Observer<Message> messageObserver = new Observer<Message>() {
        @Override
        public void onChanged(Message message) {
            // shou dao xiaoxi

        }
    };

    private ScanCallback scanCallback = new ScanCallback() {
        @Override
        public void onScanResult(int callbackType, ScanResult result) {
            super.onScanResult(callbackType, result);
        }

        @Override
        public void onBatchScanResults(List<ScanResult> results) {
            super.onBatchScanResults(results);
        }

        @Override
        public void onScanFailed(int errorCode) {
            super.onScanFailed(errorCode);
        }
    };


//    private val messageObserver = Observer<Message> { message ->
//            Log.d(TAG, "Have message ${message.text}")
//            adapter.addMessage(message)
//    }

    CalendarModule(ReactApplicationContext context) {
        super(context);
        mClient = new BluetoothClient(context);
        bluetoothManager = (BluetoothManager) getReactApplicationContext().getSystemService(Context.BLUETOOTH_SERVICE);

        if(getCurrentActivity() instanceof ReactActivity){
            ChatServer.INSTANCE.getMessages().observe((ReactActivity)getCurrentActivity(), messageObserver);
        }



    }

    private BluetoothClient getBluetoothClient() {
        return mClient;
    }

    // add to CalendarModule.java
    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean support() {
        //getReactApplicationContext()；
        // BluetoothManager bluetoothManager = (BluetoothManager) getReactApplicationContext().getSystemService(Context.BLUETOOTH_SERVICE);
        boolean open = null != bluetoothManager && bluetoothManager.getAdapter().isEnabled();
        if(open){
            ChatServer.INSTANCE.startServer(getCurrentActivity().getApplication());
        }
        return open;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean open() {
        if (null != bluetoothManager) {
            return bluetoothManager.getAdapter().isEnabled();
        }
        return false;
    }

    @ReactMethod
    public void close() {
        if (mClient.isBluetoothOpened()) {
            mClient.closeBluetooth();
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void scan(Callback callback) {

        if (null != bluetoothManager) {
            BluetoothAdapter bluetoothAdapter = bluetoothManager.getAdapter();
            bluetoothAdapter.getBluetoothLeScanner().startScan(scanCallback);
        }

    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void send(String message){
        ChatServer.INSTANCE.sendMessage(message);

    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

}
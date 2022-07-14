package me.mfpsdf2001.hydricsense;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.text.Html;
import android.text.method.LinkMovementMethod;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Set;

public class MainActivity extends AppCompatActivity {

    private Button button;
    private EditText editTextSSID, editTextPassword;
    private String connectionState = "done";
    private PhoneConnection phoneConnection;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // SET TEXT WITH HYPERTEXT LINK
        TextView link = (TextView) findViewById(R.id.linkTxt);
        String linkText = "Ingrese al sitio web <a href=\"https://eap-hs.netlify.app\">HYDRICSENSE<a> para acceder a todas las funciones del dispositivo.";
        link.setText(Html.fromHtml(linkText));
        link.setMovementMethod(LinkMovementMethod.getInstance());

        button = (Button) findViewById(R.id.button);
        editTextSSID = (EditText) findViewById(R.id.editText_SSID);
        editTextPassword = (EditText) findViewById(R.id.editText_Password);

        BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
        phoneConnection = new PhoneConnection(adapter, this);
        phoneConnection.makeConnection();

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String message = editTextSSID.getText().toString().trim() + ":" + editTextPassword.getText().toString().trim();

                if (connectionState.equals("fail") || !phoneConnection.isSuccessfulConnection())
                    phoneConnection.makeConnection();

                if (phoneConnection.isSuccessfulConnection()) {
                    phoneConnection.sendToDevice(message);
                    connectionState = "done";
                } else {
                    phoneConnection.messageSender("Verifique las conexiones e intente nuevamente.");
                    connectionState = "fail";
                }

                editTextSSID.setText("");
                editTextPassword.setText("");
            }
        });
    }

    @Override
    protected void onPause() {
        super.onPause();
        try {
            phoneConnection.disconnect();
        } catch (Exception e) {
            //ignore
        }
    }
}
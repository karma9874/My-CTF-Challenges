package com.application.darkcon;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if(!new utils().isConnected(this)){
            new utils().alert(this,"Internet Connection is required for this challenge");
        }else{
            new data_receiver().getData();
        }
    }

}
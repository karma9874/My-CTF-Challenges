package com.application.ezpz;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {

    int flag_counter=0;

    EditText button;
    Button editText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Activity context=this;

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        editText = findViewById(R.id.submit);
        button = findViewById(R.id.flagINP);

        if (! new uselessClass().flagCheckerxD(context)) {
            Toast.makeText(getApplicationContext(), "Ya need internet connection for the flag", Toast.LENGTH_SHORT).show();
        }

        String[] YEET = new whyAmIHere().isThisWhatUWant();

        editText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                float[] a = new uselessClass().toWhereEver(view,context);
                if(button.getText().toString()!=null){

                if(flag_counter < 500){
                    flag_counter+=1;
                    editText.setX(a[0]);
                    editText.setY(a[1]);
                    Toast.makeText(getApplicationContext(), "Lets Play :)", Toast.LENGTH_SHORT).show();
                }else{
                    if(YEET[0].equals(button.getText().toString())){
                        Toast.makeText(getApplicationContext(), "Well thats the  Correct Flag", Toast.LENGTH_SHORT).show();
                    }else{
                        Toast.makeText(getApplicationContext(), "Damn...500 times? are u kidding me", Toast.LENGTH_SHORT).show();
                    }
                }
                }else{
                    Toast.makeText(context, "Gib flag or get out", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
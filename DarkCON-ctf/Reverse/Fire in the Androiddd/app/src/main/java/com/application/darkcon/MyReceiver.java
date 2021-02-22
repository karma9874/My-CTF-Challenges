package com.application.darkcon;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.widget.Toast;


public class MyReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String data =  intent.getStringExtra("flag");

        if(data_receiver.data != null && data != null){
            new loader(context).execute(data,data_receiver.data);
        }else{
            Toast.makeText(context, "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }

    class loader extends AsyncTask<String,Void,Boolean> {
        Context context;

        public loader(Context context){
            this.context = context;
        }
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            Toast.makeText(context, "Checking your flag", Toast.LENGTH_SHORT).show();
        }

        @Override
        protected Boolean doInBackground(String... strings) {
            String[] parts = strings[1].split(",");
            long[] ints = new long[parts.length];
            for (int i = 0; i < parts.length; i++)ints[i] = Long.parseLong(parts[i]);
            return magic(strings[0].getBytes(),ints);
        }

        @Override
        protected void onPostExecute(Boolean aBoolean) {
            if(aBoolean){
                Toast.makeText(context, "Well thats the correct flag ", Toast.LENGTH_SHORT).show();
            }else{
                Toast.makeText(context, "Nope wrong flag :(", Toast.LENGTH_SHORT).show();
            }

        }
    }
    static {
        System.loadLibrary("native-lib");
    }
    public native boolean magic(byte[] str,long[] str1);
}

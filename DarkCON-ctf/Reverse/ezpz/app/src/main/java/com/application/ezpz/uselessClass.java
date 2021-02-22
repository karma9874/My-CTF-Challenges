package com.application.ezpz;

import android.app.Activity;
import android.content.Context;
import android.graphics.Point;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.view.Display;
import android.view.View;

public class uselessClass {

    public float[] toWhereEver(View view, Activity activity) {
        Display display = activity.getWindowManager().getDefaultDisplay();

        Point size = new Point();
        display.getSize(size);

        int lambai = size.y;
        int chodai = size.x;

        int candyX = getSomethingIDK(0,chodai-view.getWidth());
        int candyY = getSomethingIDK(lambai/20,lambai-200);
        return new float[] {candyX,candyY};
    }

    public int getSomethingIDK(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }

    protected boolean flagCheckerxD(Activity activity) {
        ConnectivityManager cm = (ConnectivityManager) activity.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        if (netInfo != null && netInfo.isConnected()) {
            return true;
        } else {
            return false;
        }
    }

}

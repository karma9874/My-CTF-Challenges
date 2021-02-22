package com.application.ezpz;

import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;

public class whyAmIHere  {

    public String[] isThisWhatUWant() {
        final String[] justAWaytoMakeAsynctoSync = {""};
        FirebaseFirestore freeOnlineDatabaseYEEEET = FirebaseFirestore.getInstance();
        freeOnlineDatabaseYEEEET.collection("A_Collection_Is_A_Set_Of_Data").get().addOnSuccessListener(new OnSuccessListener<QuerySnapshot>() {
            @Override
            public void onSuccess(QuerySnapshot queryDocumentSnapshots) {
                    for(DocumentSnapshot snapshot : queryDocumentSnapshots){
                        justAWaytoMakeAsynctoSync[0] = snapshot.getString("Points");
                        Log.d("TypicalLogcat",justAWaytoMakeAsynctoSync[0]);
                    }
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                justAWaytoMakeAsynctoSync[0] = "Something Failed,Maybe Contact Author?";
            }
        });
        return justAWaytoMakeAsynctoSync;
    }

}



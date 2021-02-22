#include <jni.h>
#include <string>
#include <string.h>
#include <testing.h>

extern "C"

JNIEXPORT jstring JNICALL Java_com_application_darkcon_MainActivity_stringFromJNI( JNIEnv* env,jobject) {
    std::string hello = "welcomexD";
    return env->NewStringUTF(hello.c_str());
}

extern "C" jboolean Java_com_application_darkcon_MyReceiver_magic(JNIEnv* env,jobject,jbyteArray input,jlongArray checker){
    jsize input_bytes = env->GetArrayLength(input);
    jsize checker_bytes = env->GetArrayLength(checker);
    if(input_bytes != checker_bytes)return 0;
    jbyte *in = env->GetByteArrayElements(input,NULL);
    jlong *ch = env->GetLongArrayElements(checker,NULL);

    for(int i=0;i<input_bytes;i++)if (ch[i] != (in[i] ^ looper(i)))return 0;
    return 1;
}

unsigned long int looper(unsigned int n){
    unsigned long int magic[n + 1];
    magic[0] = magic[1] = 1;
    for (int j = 2; j <= n; j++) {
        magic[j] = 0;
        for (int k = 0; k < j; k++)magic[j] += magic[k] * magic[j - k - 1];
    }
    return magic[n];
}


from flask import Flask, request, render_template, render_template_string

app = Flask(__name__)

@app.route('/',methods=['POST','GET'])

def newsletter():
    if request.method == 'POST':
        data = request.form.get('name')
        if data:
            data= data.replace("{{","").replace("}}","").replace(".","").replace("_","")
            return render_template('test.html',message=render_template_string(data))
        else:
            return render_template('q.html')
    else:
        return render_template('index.html',page_title="Email Newsletter")

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5000)

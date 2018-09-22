import os
from flask import Flask, render_template, request, redirect, url_for


app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY",
                                          "__YOUR_KEY_SHOULD_SET__")


@app.route("/")
def home():
    return render_template('home.html')


if __name__ == '__main__':
    app.run(debug=True)

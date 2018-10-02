# decolo

Decorate face and show message for your party guests (like [SNOW](https://itunes.apple.com/us/app/snow-beauty-makeup-camera/id1022267439?mt=8)).

<img src="https://user-images.githubusercontent.com/544269/46349121-239ccd80-c68c-11e8-9abc-d2e461d313c4.gif" alt="demo.gif" width=300 />


* Until guest's face is detected, heart circle is displayed.
* If face is detected then crown/tiara is shown over the face.

## Demo

**[Demo site](https://decolo.herokuapp.com/)**

* You can change top-left name and crown/tiara by query parameter.

* `name`: name is shown on the top-left.
* `gender`: 1=crown, 0=tiara.

You can confirm the top gif image by following url.

https://decolo.herokuapp.com?name=Namie&gender=0

To distribute url to your guests, you may have to print out qr-codes.

To support this process, `make_print_file` is prepared.

1. Prepare the `name.csv` (tab separated file). 

| full_name | name     | gender |
|-----------|----------|--------|
| Mike Adenuga | Mike | 1      |
| Anna Akhmanova | Anna  | 0      |

2. execute `python make_print_file.py`
3. `print.pptx` is generated.

<img src="https://user-images.githubusercontent.com/544269/46350335-7af06d00-c68f-11e8-862b-743776fc9580.PNG" alt="slide.png" width=300>

(Now slide message is Japanese. Please customize message by editing script file)

## Dependency

* [`clmtrackr.js`](https://github.com/auduno/clmtrackr): to detect face (TensorFlow.js is too heavy to donwload the model).
* [`Flask`](http://flask.pocoo.org/): for web server.
* [`python-pptx`](https://github.com/scanny/python-pptx)/ [`qrcode`](https://github.com/lincolnloop/python-qrcode): to generate slide.

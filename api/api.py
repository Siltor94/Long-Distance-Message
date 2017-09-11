from flask import Flask, jsonify, request
import gammu

app = Flask(__name__)

@app.route('/sms', methods=['POST'])
def send_sms():
    sm = gammu.StateMachine()
    sm.ReadConfig()
    sm.Init()
    msg = request.json['msg']
    num = request.json['num']
    message = {
        'Text': msg,
        'SMSC': {'Location': 1},
        'Number': num,
    }
    sm.SendSMS(message)
    return msg

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

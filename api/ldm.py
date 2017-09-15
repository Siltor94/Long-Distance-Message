from flask import Flask, jsonify, request
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ldmDb import Base, Boxes
import json
import requests 
import pymysql.cursors
import re

engine = create_engine('mysql+pymysql://root:123soleil@127.0.0.1:3306/ldm', echo=False)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

app = Flask(__name__)

@app.route('/', methods=['GET'])
def check_live():
    return "UP TIL YOU ARE HOLLOW"

@app.route('/boxe', methods=['POST'])
def post_boxe():
    try:
        print request.json
        i = request.json['ip']
        boxe = Boxes(ip=i)
        session.add(boxe)
        session.commit()
        return jsonify({"success": "success"})
    except TypeError as e:
        return jsonify({"error": str(e)})

@app.route('/sms/<num>', methods=['GET'])
def get_sms(num):
    boxe = session.query(Boxes).first()
    ip = boxe.ip
    r = requests.get("http://" + ip + ":5000/sms/" + num)
    return r.text

@app.route('/sms', methods=['POST'])
def send_sms():
    msg = request.json['msg']
    num = request.json['num']
    data = json.dumps({"msg": msg, "num": num})
    boxe = session.query(Boxes).first()
    ip = boxe.ip
    r = requests.post("http://" + ip + ":5000/sms", json=data)
    return r.text

@app.route('/boxe', methods=['GET'])
def get_boxe():
    try:
        boxe = session.query(Boxes).first()
        return jsonify({'boxe': boxe.ip})
    except AttributeError as e:
        return jsonify({'error': str(e)})

@app.route('/resetBoxes', methods=['DELETE'])
def reset_boxes():
    boxes = session.query(Boxes).all()
    for boxe in boxes:
        session.delete(boxe)
        session.commit()
    return jsonify({"success": "success"})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

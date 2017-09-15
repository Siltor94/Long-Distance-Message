from flask import Flask, jsonify, request
import gammu
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db import Message, Base
import ast
from flask_cors import CORS, cross_origin
import datetime
import re

engine = create_engine('mysql://root:123soleil@127.0.0.1:3306/ldm', echo=False)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})

def getmsgs(msgs):
	messages = []
	for msg in msgs:
		m = {'msg': msg.message, 'pos': msg.pos, 'date': msg.date}
		messages.append(m)
	return messages
		
def formNum(num):
	print num
	return re.sub('\+\d{2}', '0', num)

@app.route('/sms', methods=['POST', 'OPTIONS'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def send_sms():
	sm = gammu.StateMachine()
	sm.ReadConfig()
	sm.Init()
	try:
		print request.json
		msg = request.json['msg']
		num = request.json['num']
		message = {
			'Text': msg, 
			'SMSC': {'Location': 1},
			'Number': num,
		}
		print "Sending message ..."
		sm.SendSMS(message)
		print "Message send."
		print "Inserting message in db..."
		message = Message(message = msg, numero = formNum(num), pos='right', new = False, date = datetime.datetime.now())
		session.add(message)
		session.commit()
		print "Message inserted."
		return msg
	except TypeError as e:
		return jsonify({"error": str(e)})
	except gammu.GSMError as e:
		return jsonify({"error": str(e)})

@app.route('/sms/<num>', methods=['GET', 'OPTIONS'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def get_msg(num):
	print num
	msgs = session.query(Message).filter(Message.numero == formNum(num)).all()
	messages = getmsgs(msgs)
	return jsonify({'messages': messages})

@app.route('/', methods=['GET', 'OPTIONS'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def check_live():
	return "HE IS ALIIIIIIIVE!"

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')


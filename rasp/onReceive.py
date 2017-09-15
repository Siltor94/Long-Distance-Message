import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db import Message, Base
import datetime
from api import formNum

engine = create_engine('mysql://root:123soleil@127.0.0.1:3306/ldm', echo=False)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

msg = sys.argv[1]
num = formNum(sys.argv[2])

message = Message(message = msg, numero = num, pos='left', new = True, date = datetime.datetime.now())
session.add(message)
session.commit()

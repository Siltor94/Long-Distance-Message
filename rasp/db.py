import os
import sys
from sqlalchemy import Column, Enum, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
 
Base = declarative_base()
class Message(Base):
	__tablename__ = 'message'
	id = Column(Integer, primary_key=True)
	message = Column(String(1000), nullable=False)
	numero = Column(String(250), nullable=False)
	pos = Column(Enum('left', 'right'))
	new = Column(Boolean, unique=False)
	date = Column(DateTime)

engine = create_engine('mysql://root:123soleil@127.0.0.1:3306/ldm', echo=False)
Base.metadata.create_all(engine)

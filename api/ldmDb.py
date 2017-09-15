import os
import sys
from sqlalchemy import Column, Enum, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
import pymysql.cursors

Base = declarative_base()
class Boxes(Base):
    __tablename__ = 'boxes'
    id = Column(Integer, primary_key=True)
    ip = Column(String(1000), nullable=False)

engine = create_engine('mysql+pymysql://root:123soleil@127.0.0.1:3306/ldm', echo=False)
Base.metadata.create_all(engine)

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    user_drugs = relationship("UserDrugs", back_populates="user")
    favorite_drugs = relationship("FavoriteDrugs", back_populates="user")


class Drug(Base):
    __tablename__ = "drugs"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    farmaco = Column(String, nullable=False)
    detentor = Column(String, nullable=False)
    medicamento = Column(String, nullable=False)
    registro = Column(Integer, nullable=False)
    concentracao = Column(String, nullable=False)
    forma_farmaceutica = Column(String, nullable=False)
    data_inclusao = Column(String, nullable=False)

    favorite_drugs = relationship("FavoriteDrugs", back_populates="drug")


class UserDrugs(Base):
    __tablename__ = "user_drugs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)  
    principio_ativo = Column(String)  
    is_generic = Column(Boolean)  
    brand = Column(String, nullable=True)  
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    active = Column(Boolean, default=True)
    total = Column(Integer)
    taked = Column(Integer)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="user_drugs")


class Bula(Base):
    __tablename__ = "bulas"

    id = Column(Integer, primary_key=True, autoincrement=True)
    texto = Column(String, nullable=False)
    medicamento_id = Column(Integer, ForeignKey("drugs.id"), nullable=False)


class DrugCategory(Base):
    __tablename__ = "drug_categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)


class FavoriteDrugs(Base):
    __tablename__ = "favorite_drugs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    drug_id = Column(Integer, ForeignKey("drugs.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)

    user = relationship("User", back_populates="favorite_drugs")
    drug = relationship("Drug", back_populates="favorite_drugs")

class Interaction(Base):
    __tablename__ = "interactions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    principio_ativo1 = Column(String, nullable=False)
    principio_ativo2 = Column(String, nullable=False)
    gravidade_interacao = Column(String, nullable=False)
    inicio_interacao = Column(String, nullable=False)
    probabilidade_ocorrencia = Column(String, nullable=False)
    efeito = Column(String, nullable=False)

class Pharma(Base):
    __tablename__ = "pharma"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    pharma_name = Column(String, nullable=False)

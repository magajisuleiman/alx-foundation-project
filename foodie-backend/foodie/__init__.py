from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import Flask, jsonify
from sqlalchemy.exc import OperationalError
from med_app.config import Config
#from med_app.config import App_Config
from flasgger import Swagger
from flask_caching import Cache
import yaml
import os
from flask_mail import Mail
from flask_jwt_extended import JWTManager

# # Create instances of Flask extensions
# app = Flask(__name__)
# app.config.from_object(App_Config)
# if app.config["SQLALCHEMY_DATABASE_URI"]:
#         print("using db")

db = SQLAlchemy()


# Create an instance of Swagger
swagger = Swagger()

#Create an instance of the cach
cache = Cache()


mail = Mail()  # Create the mail object

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    #app.config.from_object(Config)
    if app.config["SQLALCHEMY_DATABASE_URI"]:
        print("using db")


    # Initialize CORS
    CORS(app, supports_credentials=True)

    @app.errorhandler(OperationalError)
    def handle_db_connection_error(e):
        return jsonify({"error": "Database connection error", "message": str(e)}), 500


    # Load Swagger content from the file
    with open("swagger_config.yaml", "r") as file:
        swagger_config = yaml.load(file, Loader=yaml.FullLoader)
    # Initialize Flasgger with the loaded Swagger configuration
    Swagger(app, template=swagger_config)

    #initialize the caching system
    cache.init_app(app)

    # Initialize SQLAlchemy
    db.init_app(app)

    # Secret key
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    # Flask-Mail
    app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
    app.config['MAIL_PORT'] = 587 # 465
    app.config['MAIL_USE_TLS'] = True # False
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = 'your-email@example.com'

    # JWT
    app.config['ACCESS_SECRET_KEY'] = os.getenv('ACCESS_SECRET_KEY')
    app.config['REFRESH_SECRET_KEY'] = os.getenv('REFRESH_SECRET_KEY')

    # Set the JWT_SECRET_KEY in the app configuration
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

    jwt = JWTManager(app)  # Instantiate the JWTManager class


    # Initialize Flask-Mail
    mail.init_app(app)  # Initialize Flask-Mail with your app

    # imports blueprints
    from med_app.medication.routes import medication_bp
    from med_app.reminder.routes import reminder_bp
    from med_app.adherenceLog.routes import adherence_log_bp
    from med_app.errors.handlers import error
    from med_app.medication_time_slot.routes import medication_time_slot_bp
    from .auth import auth_bp
    from .util_routes import util_bp


    # register blueprint
    app.register_blueprint(auth_bp)
    app.register_blueprint(medication_bp)
    app.register_blueprint(adherence_log_bp)
    app.register_blueprint(medication_time_slot_bp)
    app.register_blueprint(reminder_bp)
    app.register_blueprint(error)
    app.register_blueprint(util_bp)

    # create db tables from models if not exists
    with app.app_context():
        db.create_all()

    return app
from flask import Blueprint, jsonify, send_file, request, url_for, send_from_directory, current_app
from werkzeug.utils import secure_filename
from med_app.auth import login_required
import os
from med_app import db
from dotenv import load_dotenv
import cloudinary.uploader
from med_app.models.user import User


load_dotenv(".env")


util_bp = Blueprint('util', __name__)

@util_bp.route('/logs')
def get_logs():
    try:
        access_log_path = 'access_log.log'
        error_log_path = 'error_log.log'

        access_content = ''
        error_content = ''

        with open(access_log_path, 'r') as access_file:
            access_content = access_file.read()

        with open(error_log_path, 'r') as error_file:
            error_content = error_file.read()

        combined_content = f'Access Log:\n\n{access_content}\n\nError Log:\n\n{error_content}'

        return combined_content, 200, {'Content-Type': 'text/plain', 'Content-Disposition': 'attachment; filename=combined_logs.txt'}
    except FileNotFoundError:
        return "Log files not found", 404
    except Exception as e:
        return str(e), 500

# Route for cron job
@util_bp.route('/cron', methods=['GET'])
def cron_job():
    # Query the first user
    user = User.query.first()
    response = {'message': 'Everything is working fine', 'data': user.format()}
    return jsonify(response)

@util_bp.route("/upload", methods=["PATCH"])
@login_required
def upload_profile(user):
    max_file_size_kb = 250
    max_file_size_bytes = max_file_size_kb * 1024

    file_to_upload = request.files['file']
    file_name = secure_filename(file_to_upload.filename)

    if file_name == "":
        return jsonify({"error": "Bad Request", "message": "File has no name"}), 400

    file_ext = os.path.splitext(file_name)[1]

    if file_ext not in [".jpg", ".jpeg", ".png"]:
        return jsonify({"error": "Forbidden", "message": "This file type is not supported"}), 403

    file_size = int(request.headers["Content-Length"])
    if file_size > max_file_size_bytes:
        return jsonify({"error": "File Too Large", "message": f"Maximum file size is {max_file_size_kb} KB"}), 413

    try:
        current_app.logger.info('in upload route')
        cloudinary.config(cloud_name=os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), api_secret=os.getenv('API_SECRET'))
        upload_result = cloudinary.uploader.upload(file_to_upload)
        current_app.logger.info(upload_result)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

    picture_url = upload_result.get('url')

    user.profile_picture = picture_url
    db.session.commit()

    return jsonify({"picture_url": picture_url, "message": "Profile picture uploaded and stored successfully"}), 200

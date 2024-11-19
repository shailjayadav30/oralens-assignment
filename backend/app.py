from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    """Check if file extension is allowed."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/submit', methods=['POST'])
def submit_healthcare_data():
    """
    Handle healthcare dashboard form submission.
    
    Expects form data with:
    - name: Patient name
    - age: Patient age
    - file: Optional file upload
    """
    try:
        # Ensure upload directory exists
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        
        # Validate required fields
        name = request.form.get('name')
        age = request.form.get('age')
        
        if not name or not age:
            return jsonify({
                'status': 'error', 
                'message': 'Name and age are required'
            }), 400
        
        # Process file upload if present
        file = request.files.get('file')
        file_path = None
        if file and allowed_file(file.filename):
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filename)
            file_path = filename
        
        # Process and store data (replace with actual database logic)
        patient_data = {
            'name': name,
            'age': age,
            'file_path': file_path
        }
        
        # Here you would typically save to a database
        print("Received patient data:", patient_data)
        
        return jsonify({
            'status': 'success', 
            'message': 'Data submitted successfully',
            'data': patient_data
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error', 
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
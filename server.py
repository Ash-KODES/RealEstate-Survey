from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS module
import pymssql

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define the database credentials and information
server = 'unisasurveyresponses.database.windows.net'
db = 'surveyResponses'
user = 'adminuser'
password = 'Pineapple1'

@app.route('/insert-waiver', methods=['POST'])
def insert_waiver():
    try:
        # Get the client's IP address from the request object
        client_ip = request.remote_addr
        print(f"Client IP Address: {client_ip}")

        # Parse JSON data from the request
        data = request.json
        participant_name = data['participantName']
        agreed_to_terms = data['agreedToTerms']  # This should be a boolean value

        # Establish a connection to the database
        conn = pymssql.connect(server, user, password, db)
        cursor = conn.cursor()

        # Define the SQL INSERT statement
        sql_insert = "INSERT INTO dbo.WaiverResponses (ParticipantName, AgreedToTerms) VALUES (%s, %s)"

        # Execute the INSERT statement with the parsed data
        cursor.execute(sql_insert, (participant_name, agreed_to_terms))
        conn.commit()

        # Close the database connection
        conn.close()

        return jsonify({"message": "Waiver record inserted successfully"}), 200
    except Exception as e:
        error_message = {
            "error": str(e),
            "client_ip": client_ip  # Include the client's IP address in the error response
        }
        return jsonify(error_message), 500


@app.route('/insert-data', methods=['POST'])
def insert_data():
    try:
        # Parse JSON array from the request
        data = request.get_json(force=True)
        print("Data:", data)

        # Establish a connection to the database
        conn = pymssql.connect(server, user, password, db)
        cursor = conn.cursor()

        # Define the SQL INSERT statement
        sql_insert = "INSERT INTO dbo.SurveyResponses (sessionid, datetime, question_number, question, response ,hometype,home) VALUES (%(sessionid)s, %(datetime)s, %(question_number)s, %(question)s, %(response)s ,%(hometype)s, %(home)s)"
        # Iterate over the array and insert each response
        for response in data:
            sessionid = response.get('sessionid')
            datetime = response.get('datetime')
            question_number = response.get('question_number')
            question = response.get('question')
            response_text = response.get('response')
            hometype=response.get('housetype')
            home = response.get('home')
            # since the response is a list, we need to convert it to a string
            if isinstance(response_text, list):
                response_text = ', '.join(response_text)

            try:
                # Execute the INSERT statement with the parsed data
                cursor.execute(sql_insert, {"sessionid": sessionid, "datetime": datetime, "question_number": question_number, "question": question, "response": response_text, "hometype": hometype, "home": home})
                conn.commit()  # Commit changes to the database
                # print(type(sessionid), type(datetime), type(question_number), type(question), type(response_text))


            except Exception as insertion_error:
                conn.rollback()  # Rollback changes in case of an error
                print(f"Insertion error: {str(insertion_error)}")  # Log the exception details
                raise insertion_error  # Raise the error to be captured in the response

        # Close the database connection
        conn.close()

        return jsonify({"message": "Records inserted successfully"}), 200

    except Exception as e:
        print(f"General error: {str(e)}")  # Log the general exception details
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask
import conn as db

app = Flask(__name__)

def add_data(BlinkDuration, BlinkType):
    try:
        
        # Connect to database
        conn = db.create_connection()
        cur = conn.cursor()

        # Insert to database
        cur.execute("INSERT INTO blink_logs (blink_duration, blink_type_id) VALUES (%s, %s)",
                    (BlinkDuration, BlinkType))
        conn.commit()
        
        # Close connection 
        cur.close()
        conn.close()

        # Success
        return "Veri başarıyla eklendi", 200
    except Exception as e:
        # Error 
        return str(e), 500

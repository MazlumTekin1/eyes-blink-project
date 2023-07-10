import psycopg2


def create_connection():
            conn = psycopg2.connect(
                database="postgres",
                user="postgres",
                password="12345",
                host="localhost",
                port="5432"
            )
            return conn
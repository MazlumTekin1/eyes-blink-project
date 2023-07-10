# Eyes Blink Project

In this project, it is aimed to operate the components specified in the interface with blinking gesture.

## Installation

There is a go-service-local file inside the frontend folder. You need to run this file with double click.

You need to run index.html file with live server.

There is conn.py file inside the opencv folder. In this file you need to enter your own database connection information.

You need to run the main.py file inside the opencv folder.

```bash
python main.py
```

## Usage
PostgreSQL was used for database operations in this project. Below are the DDLs of the database tables.
```CREATE TABLE public.blink_logs (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	blink_type_id int8 NULL,
	blink_duration float8 NULL,
	create_date timestamp NOT NULL DEFAULT now(),
	is_deleted bool NULL,
	CONSTRAINT blink_logs_pk PRIMARY KEY (id),
	CONSTRAINT blink_logs_un UNIQUE (id),
	CONSTRAINT fk_blink_type_id FOREIGN KEY (blink_type_id) REFERENCES public.blink_log_blink_type(id) ON DELETE CASCADE
);
```
```
CREATE TABLE public.blink_log_blink_type (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	blink_type varchar NULL,
	create_date timestamp NOT NULL DEFAULT now(),
	CONSTRAINT blink_log_blink_type_pkey PRIMARY KEY (id),
	CONSTRAINT blink_log_blink_type_un UNIQUE (id)
);
```
You need to run the DDLs above and enter your own connection path in the conn.go and conn.py files in the frontend and opencv folders.

## How to Run the Project
1- Create database tables as described above. Information is entered in the connection paths of Go and Python projects.  

2- main.go is run.

3- main.py is run.

4- Run index.html.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
import requests
import urllib
import psycopg2.extras
import json
import sys

type_lookup_table = {
    'int': int,
    'str': str,
    'float': float,
    'bool': bool
}

# load script parameters from file
script_params = None
if len(sys.argv) == 2:
    with open(sys.argv[1], encoding='utf-8') as file:
        script_params = json.load(file)
elif len(sys.argv) == 1:
    with open('/tmp/script_parameters.json', encoding='utf-8') as file:
        script_params = json.load(file)
else:
    exit(-1)


# parse params into query string
params = urllib.parse.urlencode(script_params['API_PARAMS'])
# append query string to API URL
url = f'{script_params["API_URL"]}?{params}'
print(f'Pulling data from BN API using URL: {url}')

# pulling data
response = requests.get(url).json()
pulled_rows = len(response['bibs'])

# variable for storing books found in the API
books = []

while True:
    print(f'Pulled so far: {pulled_rows}')

    # parsing books in response
    for book in response['bibs']:
        book.pop('marc')
        books.append(book)

    # creating new URL for more data to be pulled, the nextPage returned in normal response doesn't retain all keys
    # in query string
    next_url = response['nextPage']
    since_id = urllib.parse.parse_qs(urllib.parse.urlsplit(next_url).query)['sinceId'][0]
    next_url_params = script_params['API_PARAMS'].copy()
    next_url_params['sinceId'] = since_id
    next_url_params = urllib.parse.urlencode(next_url_params)
    next_url = f'{script_params["API_URL"]}?{next_url_params}'
    print(f'Next URL: {next_url}')

    if 0 < script_params['MAX_ROWS_TO_PULL'] <= pulled_rows:
        break

    # pull more data
    response = requests.get(next_url).json()
    pulled_rows += len(response['bibs'])

    if len(response['bibs']) == 0:
        print('No more books for given parameters found in the database API')
        break

connection = psycopg2.connect(
    host=script_params['DB']['HOST'],
    port=script_params['DB']['PORT'],
    database=script_params['DB']['NAME'],
    user=script_params['DB']['USER'],
    password=script_params['DB']['PASS']
)
connection.autocommit = True


# transforming the data pulled from API to be suitable for the 'execute_values' function, each row to be inserted is
# a list matching (in order) the columns from COLUMNS_IN_TABLE parameter
# converting all data to match the columns using a lookup table and builtin python types
# type_lookup_table[db_type](book[column]) returns the class type and evaluates to as if someone wrote int(book[column])
# with example being int
values = [[type_lookup_table[db_type](book[column]) for column, db_type in script_params['DB']['COLUMNS_TO_POPULATE'].items()] for book in books]

table_columns = str(script_params['DB']['COLUMNS_IN_TABLE']).replace("'", "\"").replace('[', '(').replace(']', ')')

with connection.cursor() as cursor:
    psycopg2.extras.execute_values(cursor, f'INSERT INTO "{script_params["DB"]["TABLE"]}" {table_columns} VALUES %s', values)

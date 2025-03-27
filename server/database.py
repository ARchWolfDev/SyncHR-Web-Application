import psycopg2.extras
import json

with open('../DBConfig.json', 'r') as db_config:
    db_data = json.load(db_config)

database = db_data['serverGroup']['server']['database']
user = db_data['serverGroup']['server']['username']
password = db_data['serverGroup']['server']['password']
host = db_data['serverGroup']['server']['hostName']
port = db_data['serverGroup']['server']['port']

CONNECTION = psycopg2.connect(database=database, user=user, password=password, host=host, port=port)
CURSOR = CONNECTION.cursor(cursor_factory=psycopg2.extras.DictCursor)


def get_next_id(alias: str):
    CURSOR.execute(f"SELECT get_next_id('{alias}')")
    result = CURSOR.fetchall()[0][0]
    return result


def get_table(alias: str):
    CURSOR.execute(f"SELECT get_table('{alias}')")
    result = CURSOR.fetchall()[0][0]
    return result


def get_next_link_id():
    CURSOR.execute(f"SELECT get_next_link_id()")
    result = CURSOR.fetchall()[0][0]
    return result


class Select:

    def __init__(self, alias: str, column: str = '*'):
        """Table can be also a function if is needed"""
        self.table = get_table(alias)
        self.column = column
        self.description = []
        self.result = []

    def all(self):
        """It returns all rows from the table specified in Select(<table_name>) as a list of lists (need to call the
        .result object to fetch the data)"""
        CURSOR.execute(
            f"SELECT {self.column} "
            f"FROM {self.table}")
        self.result = CURSOR.fetchall()
        self.description = CURSOR.description
        return self

    def dict_result(self):
        """It returns all rows from the table specified in Select(<table_name>) as a list of dicts (no need to call
        the .result)"""
        result_list = []
        result_dict = {}
        for value in self.result:
            for description in self.description:
                result_dict[description[0]] = value[description[0]]
            result_list.append(result_dict)
            result_dict = {}
            self.result = result_list
        return result_list

    def count(self):
        return len(self.result)

    def where(self, **kwargs):
        """Conditional SELECT, key is the column name and value is the value by what is search. It can be used the
        dictionary as data( as key ) = dictionary ( as value )"""
        where = []
        for key, value in kwargs.items():
            if isinstance(value, dict):
                kwargs = value

        for k, v in kwargs.items():
            where.append(k)
            if "%" in v:
                where.append("LIKE")
            elif "n(" in v:
                where.append("NOT IN")
                v = v.replace("n(", "(")
            elif "(" in v:
                where.append("IN")
            else:
                where.append("=")
            if "'" not in v:
                v = f"'{v}'"
            where.append(f"{v}")
            where.append("AND")
        where.pop(-1)
        final_where = " ".join(where)
        CURSOR.execute(
            f"SELECT {self.column} "
            f"FROM {self.table} "
            f"WHERE {final_where}")
        self.result = CURSOR.fetchall()
        self.description = CURSOR.description
        return self

    def function(self):
        """Executing database function."""
        CURSOR.execute(f"SELECT {self.table}")
        self.result = CURSOR.fetchall()
        return self


class Insert:

    def __init__(self, alias: str, data: dict):
        self.table = get_table(alias)
        self.data = data

    def insert(self):
        columns = []
        values = []

        for col, val in self.data.items():
            columns.append(col)
            values.append(f"'{val}'")

        CURSOR.execute(
            f"INSERT INTO {self.table} ({', '.join(columns)}) "
            f"VALUES ({', '.join(values)})")
        CONNECTION.commit()


class Update:

    def __init__(self, alias: str, data: dict, where_val: str, where_key: str = "id", where_operator: str = "="):
        self.table = get_table(alias)
        self.data = data
        self.where_key = where_key
        self.where_val = where_val
        self.where_operator = where_operator

    def update(self):
        data_to_update = []

        for key, values in self.data.items():
            data_to_update.append(f"{key} = '{values}'")

        CURSOR.execute(
            f"UPDATE {self.table} "
            f"SET {', '.join(data_to_update)} "
            f"WHERE {self.where_key} {self.where_operator} {self.where_val}")
        CONNECTION.commit()


class Delete:

    def __init__(self, alias: str, where_val: str, where_key: str = "id", where_operator: str = "="):
        self.table = get_table(alias)
        self.where_key = where_key
        self.where_operator = where_operator
        self.where_val = where_val

    def delete(self):
        CURSOR.execute(
            f"DELETE FROM {self.table} "
            f"WHERE {self.where_key} {self.where_operator} '{self.where_val}'")
        CONNECTION.commit()


class Query:
    def __init__(self, query: str):
        self.query = query

    def fetch(self):
        CURSOR.execute(self.query)
        return self

    @staticmethod
    def all():
        return CURSOR.fetchall()

    @staticmethod
    def one():
        return CURSOR.fetchone()

    @staticmethod
    def commit():
        return CONNECTION.commit()

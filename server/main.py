from flask import Flask, request, jsonify
from werkzeug.security import check_password_hash
import datetime
from functools import wraps
from flask_cors import CORS
import json
import jwt
import database as db
import dummy_json as dj

app = Flask(__name__)
CORS(app, supports_credentials=True)

with open("../AppConfig.json", "r") as app_config:
    app_data = json.load(app_config)

app.config['SECRET_KEY'] = app_data["appSecretKey"]


# TODO Create a new file specifically for the Token and make multiple function ( to decode, to extract data from
#  token, etc. )
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # request.cookies.get('jwt')

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({"message": 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            request.user = data['id']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401

        return f(*args, **kwargs, token=token)

    return decorated


@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("emailAddress")
    password = request.json.get("password")
    try:
        db_user = db.Select('users').where(email=email).dict_result()[0]
        if check_password_hash(db_user['password'], password):
            token = jwt.encode({
                'id': db_user['id'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=app_data['tokenExpiryMinutes'])
            }, app.config['SECRET_KEY'], algorithm='HS256')
            response = jsonify({
                "message": "Login successfully",
                "token": token
            })
            return response, 200
        else:
            return jsonify({"message": "Incorrect password!"}), 401
    except IndexError:
        return jsonify({"message": "Email not found!"}), 401


# TODO Fix the refreshToken API
@app.route("/api/refreshToken", methods=["GET"])
@token_required
def refresh_token(token):
    return jsonify({
        "message": "token is still valid"
    })


@app.route('/api/preferences', methods=["POST", "GET"])
@token_required
def application_interface_config(token):
    decoded_token = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
    user_id = decoded_token['id']
    if request.method == 'GET':
        user_config = db.Select('userAppConfig').where(user_id=user_id).dict_result()
        return jsonify({
            "message": "Preferences loaded successfully",
            "data": user_config[0]
        })


@app.route('/api/timesheet', methods=['GET', 'POST'])
@token_required
def timesheet_api(token):
    if request.method == 'GET':
        if not request.args:

            return jsonify(db.Select('reqTimesheets').all().dict_result())
        else:
            args = request.args.to_dict()
            print(args)
            # TODO To find a solution to filter and sort by at the same time.
            if 'sortBy' in args:
                result = {}
                # TODO To modify the 'reqTimesheets' in the database to 'timesheets' or right said 'timesheet' only.
                #  Need to find a way to make a difference between table and view
                for distinct_key in db.Select('reqTimesheets', column=f'distinct({args["sortBy"]})').all().result:
                    if type(distinct_key[0]) == datetime.date:
                        distinct_key = [str(distinct_key[0])]
                    condition = {args['sortBy']: distinct_key[0]}
                    # TODO Make possible multiple conditional from a dictionary.EX: SortBy=id&name
                    sorted_result = db.Select('reqTimesheets').where(data=condition).dict_result()
                    result[distinct_key[0]] = sorted_result
                return jsonify(result)
            else:
                return jsonify(db.Select('reqTimesheets').where(data=args).dict_result())

    elif request.method == 'POST':
        data = request.json
        data['id'] = db.get_next_id('timesheets')
        data['tasks_count'] = len(data['tasks'])
        timesheet_tasks = data['tasks']
        del data['tasks']
        db.Insert('timesheets', data).insert()
        for task in timesheet_tasks:
            task['timesheet_id'] = data['id']
            db.Insert('timesheetTasks', task).insert()
        return jsonify({'message': 'Request submitted successfully'})


# DEACTIVATED
@app.route('/api/request/timesheet', methods=['GET', 'POST'])
@token_required
def timesheet_request_api(token):
    if request.method == 'POST':
        data = request.json
        print(data)
        data['id'] = db.Select('cv_id_count', column='next_id_available').where(id='RTSH-').result[0][0]
        data['tasks_count'] = len(data['tasks'])
        timesheet_tasks = data['tasks']
        del data['tasks']
        db.Insert('t_req_timesheets', data).insert()
        for task in timesheet_tasks:
            task['timesheet_id'] = data['id']
            db.Insert('t_req_timesheet_tasks', task).insert()
        print(data)
        print(timesheet_tasks)
        return jsonify({'message': 'Request submitted successfully'})
    else:
        return jsonify({'message': 'Something is wrong'})


@app.route('/api/tasks', methods=['GET', 'POST', 'DELETE'])
@token_required
def tasks_api(token):
    if request.method == 'GET':
        if request.args:
            args = request.args.to_dict()
            return db.Select('tasks').where(data=args).dict_result()
        else:
            return jsonify(db.Select(request.path[5:]).all().dict_result())

    elif request.method == 'POST':
        # TODO Need to be implement the DELETE, UPDATE Options.
        # TODO Option: To be specified from the json (client side) the action.
        alias = request.path[5:]
        new_task = request.json
        new_task['id'] = db.get_next_id(alias)
        db.Insert(alias, data=new_task).insert()
        return jsonify({"message": "Task created successfully!"}), 200

    # TODO Eventually to create a separated API for only DELETE method for every deletion.
    elif request.method == 'DELETE':
        for task_id in request.args.to_dict().values():
            db.Delete('tasks', where_val=task_id).delete()

        return jsonify({"message": "Task deleted successfully!"}), 200


@app.route('/api/projects', methods=['GET', 'POST'])
@token_required
def projects_api(token):
    alias = request.path[5:]
    if request.method == "GET":
        if not request.args:
            return jsonify(db.Select(alias).all().dict_result())
        else:
            args = request.args.to_dict()
            return jsonify(db.Select(alias).where(data=args).dict_result())

    elif request.method == "POST":
        data = request.json
        data['id'] = db.get_next_id(alias)
        db.Insert(alias, data=data).insert()
        return jsonify({"message": "Project created successfully!"}), 200


@app.route('/api/taskLists', methods=['GET', 'POST'])
@token_required
def task_lists_api(token):
    if request.method == 'GET':
        if request.args:
            args = request.args.to_dict()
            return jsonify(db.Select('taskLists').where(data=args).dict_result())
        else:
            return jsonify(db.Select('taskLists').all().dict_result())
    elif request.method == 'POST':
        new_task_list = request.json
        new_task_list['id'] = db.get_next_id('taskLists')
        new_task_list['created_by'] = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])['id']
        db.Insert('taskLists', data=new_task_list).insert()
        print(new_task_list)
        return jsonify({"message": "Task List created successfully!"})


# DEACTIVATED TEMPORARY Kept for the task list - task relation
@app.route('/api/task-lists', methods=['GET', 'POST'])
@token_required
def x_task_lists_api(token):
    if request.method == 'GET':
        if request.args:
            project_id = request.args.get('projectId')
            task_list_id = ''
            for links in dj.tasks_list_projects:
                if links['project_id'] == project_id:
                    task_list_id = links['task_list_id']
            task_lists = []
            for task_list in dj.tasks_lists:
                if task_list['id'] == task_list_id:
                    tasks = []
                    for link in dj.tasks_tasks_list:
                        if link['tasks_list_id'] == task_list['id']:
                            task = link['task_id']
                            for t in dj.tasks:
                                if t['id'] == task:
                                    tasks.append(t)
                    task_list['tasks'] = tasks
                    task_lists.append(task_list)
            return jsonify(task_lists)
        else:
            return jsonify(dj.tasks_lists)


# DEACTIVATED
@app.route('/api/request/timeOff', methods=['GET', 'POST'])
@token_required
def time_off_api(token):
    if request.method == 'POST':
        data = request.json
        print(data)
        return jsonify({
            "message": "Time off requested successfully!"
        })
    elif request.method == 'GET':
        db.Select('t_emp_time_off').all().dict_result()
        return jsonify(db.Select('t_emp_time_off').all().dict_result())


if __name__ == "__main__":
    app.run(debug=True)

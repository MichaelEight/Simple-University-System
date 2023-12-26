def generate_registrations_sql(subject_id, teacher_id, start_time, end_time, weekday, weeks, room, student_id_start, student_id_end):
    """
    Generate SQL insert statements for the Registrations table.

    Args:
    - subject_id (int): The subject ID.
    - teacher_id (int): The teacher ID.
    - start_time (str): The start time of the class.
    - end_time (str): The end time of the class.
    - weekday (str): The day of the week.
    - weeks (str): Type of weeks (e.g., 'wszystkie', 'parzyste', 'nieparzyste').
    - room (str): The room where the class is held.
    - student_id_start (int): The starting student ID.
    - student_id_end (int): The ending student ID.

    Returns:
    - list: A list of SQL insert statements.
    """
    sql_statements = []

    for student_id in range(student_id_start, student_id_end + 1):
        sql_statement = f"({subject_id}, {student_id}, {teacher_id}, '{room}', '{start_time}', '{end_time}', '{weekday}', '{weeks}', 0)"
        sql_statements.append(sql_statement)

    return sql_statements

# Example usage:
# (13, 100011, 1002, '111', '16:30:00', '18:00:00', 'piątek', 'wszystkie', 0),
subject_id = 17
teacher_id = 1001
start_time = '9:59:00'
end_time = '11:01:00'
weekday = 'piątek'
weeks = 'wszystkie'
room = '001'
student_id_start = 100014
student_id_end = 100024

sql_statements = generate_registrations_sql(subject_id, teacher_id, start_time, end_time, weekday, weeks, room, student_id_start, student_id_end)
sql_statements_joined = ',\n'.join(sql_statements)
print(sql_statements_joined)

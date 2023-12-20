import random

def generate_grades_sql(student_id_start, student_id_end, subject_ids, teacher_id_start, teacher_id_end):
    """
    Generate SQL insert statements for the Grades table.

    Args:
    - student_id_start (int): The starting student ID.
    - student_id_end (int): The ending student ID.
    - subject_ids (list): List of available subject IDs.
    - teacher_id_start (int): The starting teacher ID.
    - teacher_id_end (int): The ending teacher ID.

    Returns:
    - list: A list of SQL insert statements.
    """
    sql_statements = []
    grades = ['2.0', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5']

    for student_id in range(student_id_start, student_id_end + 1):
        # Ensure unique subject IDs for each student
        selected_subjects = random.sample(subject_ids, 3)
        for subject_id in selected_subjects:
            posted_by_id = random.randint(teacher_id_start, teacher_id_end)
            grade = random.choice(grades)
            sql_statement = f"({student_id}, {subject_id}, {posted_by_id}, NOW(), '{grade}', NULL, NULL, 'not_accepted')"
            sql_statements.append(sql_statement)

    return sql_statements

# Define the parameters
student_id_start = 100002
student_id_end = 100013
subject_ids = [1, 2, 3, 5, 7, 9, 10, 11, 12, 13]
teacher_id_start = 1000
teacher_id_end = 1009

# Generate the SQL statements
sql_statements = generate_grades_sql(student_id_start, student_id_end, subject_ids, teacher_id_start, teacher_id_end)
sql_statements_joined = ',\n'.join(sql_statements)
print(sql_statements_joined)

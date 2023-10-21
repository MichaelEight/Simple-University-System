import bcrypt

# The password you want to hash
provided_password = "banan8"

# Generate a salt and hash the password
salt = bcrypt.gensalt()
hashed_password = bcrypt.hashpw(provided_password.encode('utf-8'), salt)

# The hashed password can be stored in the database
print(hashed_password.decode('utf-8'))  # Convert bytes to string for storage
print(salt)

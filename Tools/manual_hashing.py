import bcrypt

# The password you want to hash
provided_password = "truskawka22"

# Pre-generated salt
salt = b"$2y$10$92a85d32ea000287c4d543"

# Encode the password as bytes
encoded_password = provided_password.encode('utf-8')

# Hash the password using the pre-generated salt
hashed_password = bcrypt.hashpw(encoded_password, salt)

# The hashed password and salt can be stored in the database
print(hashed_password.decode('utf-8'))  # Convert bytes to string for storage
print(salt.decode('utf-8'))  # Convert bytes to string for storage

steps = [
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(20) NOT NULL UNIQUE,
            email VARCHAR(50) NOT NULL UNIQUE,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            hashed_password VARCHAR(1000) NOT NULL
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ],
    [
        """
        CREATE TABLE movies (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(255) NOT NULL,
            released DATE NOT NULL,
            plot TEXT NOT NULL,
            rated VARCHAR(5) NOT NULL,
            imdbID VARCHAR(9) NOT NULL,
            poster VARCHAR(1000) NOT NULL
        );
        """,
        """
        DROP TABLE movies;
        """,
    ],
    [
        """
        CREATE TABLE movie_groups (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            owner INTEGER REFERENCES accounts(id)

        );
        """,
        """
        DROP TABLE movie_groups;
        """,
    ],
    [
        """
        CREATE TABLE movie_items (
            id SERIAL PRIMARY KEY NOT NULL,
            movie_id INTEGER REFERENCES movies(id),
            movie_group_id INTEGER REFERENCES movie_groups(id),
            item_position INTEGER
        );
        """,
        """
        DROP TABLE movie_items;
        """,
    ],
]

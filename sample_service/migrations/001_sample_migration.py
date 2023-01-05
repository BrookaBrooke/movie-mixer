steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE user (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(20) NOT NULL UNIQUE,
            password VARCHAR(20) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE movie (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(255) NOT NULL,
            released DATE NOT NULL,
            plot TEXT NOT NULL,
            rated VARCHAR(5) NOT NULL,
            imdbID VARCHAR(9) NOT NULL,
            poster VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE movie;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE movie_item (
            id SERIAL PRIMARY KEY NOT NULL,
            movie_id INTEGER REFERENCES movie(id),
            movie_list_id INTEGER REFERENCES movie_list(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE movie_item;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE movie_list (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            owner INTEGER REFERENCES user(id),

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE movie_list;
        """,
    ],
]

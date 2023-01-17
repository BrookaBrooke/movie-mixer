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
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            release_date DATE NOT NULL,
            overview TEXT NOT NULL,
            imdb_id VARCHAR(9) NOT NULL,
            poster_path VARCHAR(1000) NOT NULL,
            vote_average FLOAT NOT NULL,
            api3_id INT NOT NULL
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
            movie_group_id INTEGER REFERENCES movie_groups(id) ON DELETE CASCADE,
            item_position INTEGER
        );
        """,
        """
        DROP TABLE movie_items;
        """,
    ],
]

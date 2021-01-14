FROM postgres:13
COPY backend.sql .
EXPOSE 5432


FROM python:3.9-slim
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /server
COPY . /server
RUN pip3 install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py runserver
FROM python:3.8-slim

WORKDIR /app
ADD /app /app

RUN useradd -m ctf
RUN pip3 install --upgrade --no-cache-dir -r requirements.txt

RUN chown -R root:ctf /app && chmod 750 /app /app/app.py

USER ctf
EXPOSE 5000
CMD ["/usr/local/bin/python", "/app/app.py"]


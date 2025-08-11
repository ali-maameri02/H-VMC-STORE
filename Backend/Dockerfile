# Use official Python image
FROM python:3.12

# Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy entire project
COPY . .

# Expose port
EXPOSE 8000

# Default command (you can override in docker-compose)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

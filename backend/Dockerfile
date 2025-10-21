FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --use-deprecated=legacy-resolver -r requirements.txt
RUN pip install pydantic-settings
RUN pip install 'pydantic[email]'
RUN pip install numpy==1.24.3
RUN pip install scipy==1.10.1
RUN pip install contourpy==1.1.1

# Copy application code
COPY . .

# Create directories for uploads
RUN mkdir -p uploads/ecg_files uploads/visualizations

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
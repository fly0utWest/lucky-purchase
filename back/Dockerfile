# Используем официальный образ Python
FROM python:3.12

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости в контейнер
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все файлы проекта в контейнер
COPY . .

# Выполняем миграции (выполняется во время запуска контейнера, а не сборки)
CMD ["python", "manage.py", "migrate"]

# Указываем команду для запуска приложения
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


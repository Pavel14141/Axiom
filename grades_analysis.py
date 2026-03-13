# Список оценок учеников
grades = [4, 5, 3, 4, 2, 5, 4, 3, 5, 4, 2, 3, 4, 5, 3]

# 1. Подсчет количества каждой оценки
count_5 = grades.count(5)
count_4 = grades.count(4)
count_3 = grades.count(3)
count_2 = grades.count(2)

print("=== Количество каждой оценки ===")
print(f"Пятёрок: {count_5}")
print(f"Четвёрок: {count_4}")
print(f"Троек: {count_3}")
print(f"Двоек: {count_2}")
print()

# 2. Подсчет положительных оценок (4 и 5)
positive_count = count_5 + count_4
print(f"=== Положительные оценки (4 и 5) ===")
print(f"Учеников с хорошими оценками: {positive_count}")
print()

# 3. Вычисление процента неудовлетворительных оценок (2 и 3)
total_students = len(grades)
not_satisfactory_count = count_2 + count_3

# Проверка деления на ноль - важная защита от ошибок
# Если total_students будет 0, программа упадет с ZeroDivisionError
# С проверкой программа безопасна и выдаст осмысленное сообщение
if total_students > 0:
    not_satisfactory_percent = (not_satisfactory_count / total_students) * 100
    print(f"=== Процент неудовлетворительных оценок ===")
    print(f"Неудовлетворительных (2 и 3): {not_satisfactory_count} из {total_students}")
    print(f"Процент: {not_satisfactory_percent:.1f}%")
else:
    print("ОШИБКА: Нет данных для анализа (количество учеников = 0)")

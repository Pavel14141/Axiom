import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Данные для 3 предметов по 10 тем каждый
const topicsData = [
  // Физика (10 тем)
  { subject_id: '1', title: 'Механика. Основы', description: 'Кинематика, динамика, законы Ньютона' },
  { subject_id: '1', title: 'Механика. Законы сохранения', description: 'Импульс, энергия, работа' },
  { subject_id: '1', title: 'Механика. Колебания и волны', description: 'Маятники, волны, звук' },
  { subject_id: '1', title: 'Молекулярная физика', description: 'МКТ, уравнение состояния газа' },
  { subject_id: '1', title: 'Термодинамика', description: 'Первое и второе начало термодинамики' },
  { subject_id: '1', title: 'Электростатика', description: 'Заряды, поле, закон Кулона' },
  { subject_id: '1', title: 'Постоянный ток', description: 'Сила тока, напряжение, сопротивление' },
  { subject_id: '1', title: 'Электромагнетизм', description: 'Магнитное поле, индукция' },
  { subject_id: '1', title: 'Колебания и волны', description: 'Электромагнитные колебания, волны' },
  { subject_id: '1', title: 'Оптика', description: 'Отражение, преломление, линзы' },
  // Алгебра (10 тем)
  { subject_id: '2', title: 'Числа и выражения', description: 'Натуральные, целые, рациональные числа' },
  { subject_id: '2', title: 'Степени и корни', description: 'Свойства степеней, арифметический корень' },
  { subject_id: '2', title: 'Многочлены', description: 'Действия с многочленами, формулы сокращенного умножения' },
  { subject_id: '2', title: 'Алгебраические дроби', description: 'Сокращение, действия с дробями' },
  { subject_id: '2', title: 'Уравнения', description: 'Линейные, квадратные, рациональные уравнения' },
  { subject_id: '2', title: 'Неравенства', description: 'Линейные, квадратные, метод интервалов' },
  { subject_id: '2', title: 'Функции', description: 'Свойства функций, графики' },
  { subject_id: '2', title: 'Прогрессии', description: 'Арифметическая и геометрическая прогрессии' },
  { subject_id: '2', title: 'Элементы комбинаторики', description: 'Перестановки, размещения, сочетания' },
  { subject_id: '2', title: 'Теория вероятностей', description: 'Случайные события, вероятность' },
  // Геометрия (10 тем)
  { subject_id: '3', title: 'Начальные геометрические сведения', description: 'Точки, прямые, отрезки, углы' },
  { subject_id: '3', title: 'Треугольники', description: 'Признаки равенства, равнобедренный треугольник' },
  { subject_id: '3', title: 'Параллельные прямые', description: 'Признаки параллельности, аксиома параллельности' },
  { subject_id: '3', title: 'Соотношения в треугольниках', description: 'Неравенство треугольника, углы' },
  { subject_id: '3', title: 'Окружность', description: 'Касательная, вписанные и центральные углы' },
  { subject_id: '3', title: 'Векторы', description: 'Координаты вектора, действия с векторами' },
  { subject_id: '3', title: 'Метод координат', description: 'Уравнение окружности и прямой' },
  { subject_id: '3', title: 'Движения', description: 'Симметрия, поворот, параллельный перенос' },
  { subject_id: '3', title: 'Площади фигур', description: 'Площадь треугольника, четырехугольника' },
  { subject_id: '3', title: 'Подобие фигур', description: 'Признаки подобия треугольников' },
]

async function addTopics() {
  console.log('Добавление тем в базу данных...')

  const { data, error } = await supabase
    .from('topics')
    .insert(topicsData)
    .select()

  if (error) {
    console.error('Ошибка при добавлении тем:', error)
    return
  }

  console.log(`Успешно добавлено ${data?.length || 0} тем`)
  console.log('Готово!')
}

addTopics()

# AI Description Bot

Автоматическая генерация описания PR на основе diff изменений с использованием AI (Groq/Llama).

## Возможности

- Автоматическая генерация структурированного описания при создании PR
- Анализ diff и определение типа изменений
- Пропуск PR, которые уже имеют описание (> 50 символов)
- Игнорирование lock-файлов, node_modules и прочего мусора

## Установка

1. Добавьте секрет `GROQ_API_KEY` в настройках репозитория:
   - Settings → Secrets and variables → Actions → New repository secret

2. Скопируйте файлы в ваш репозиторий:
   ```
   .github/workflows/ai-description.yml
   src/description-generator.js
   package.json
   ```

3. Установите зависимости:
   ```bash
   npm install
   ```

## Использование

Бот автоматически срабатывает при создании нового PR. Если PR уже имеет описание длиной более 50 символов, генерация пропускается.

## Формат генерируемого описания

```markdown
## Summary
Краткое описание изменений

## Changes
- Список конкретных изменений
- Сгруппированных по логике

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Refactoring
- [ ] Documentation
- [ ] Tests

## Additional Notes
Дополнительный контекст
```

## Локальный запуск

```bash
export GITHUB_TOKEN=your_token
export GROQ_API_KEY=your_groq_key
export GITHUB_REPOSITORY=owner/repo
export PR_NUMBER=123

npm run generate
```

## Получение Groq API Key

1. Зарегистрируйтесь на [console.groq.com](https://console.groq.com)
2. Создайте API ключ в разделе API Keys
3. Добавьте его как секрет репозитория

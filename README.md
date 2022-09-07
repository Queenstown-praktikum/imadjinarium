## Игра "Имаджинариум"

### [imadjinarium.herokuapp.com](https://imadjinarium.herokuapp.com/)

Клонирование проекта SSH:
```bash
git clone git@github.com:Queenstown-praktikum/imadjinarium.git
```

1) `npm i` - инициализация проекта
2) `npm run start` - запускает режим разработки webpack-dev-server PORT=3000
3) `npm run build` - сборка проекта webpack -> dist
4) `npm run lint` - проверка eslint
5) `npm run lint:fix` - исправление eslint
6) `npm run stylelint` - проверка stylelint
7) `npm run stylelint:fix` - исправление stylelint
8) `npm run format` - запускает prettier
9) `npm run storybook` - запускает storybook
9) `npm run build-storybook` - сборка storybook

В проекте подключена `husky`, на `pre-commit` запускает `lint-staged`:

```json
  "lint-staged": {
    "client/**/*.(js|jsx|ts|tsx)": "eslint --fix",
    "client/**/*.(css|sass|scss)": "stylelint --fix"
  }
```

### Принятые договоренности
1) Git
    
    `master` - главная ветка, от нее создаем ветки спринтов, по окончанию задач спринта вливаем в `master`

    `sprint_№` - ветка спринта от нее создаем задачи и в нее же их мерджим

   - Фичи `feature/issues-№` 
   - Баги `bagfix/issues-№`
   - Коммиты `issues №: ....`
   
    `deploy` - развертывание на Heroku

3) Умные компоненты храним в папке `Features`
4) Components, Feature, Pages ... экспортируем из осмысленно наименованных файлов, не из `index.tsx`


## Heroku инструкция
  При мерже в `deploy` автоматически происходит развертывание
  [Статья](https://dev.to/heroku/deploying-to-heroku-from-github-actions-29ej)
  
  Для ручного развертывания:
  - `heroku container:login`
  - `heroku create <name-app>` 
  - `heroku container:push web`
  - `heroku container:release web`
  - `heroku open`

  Посмотреть логи:
  - `heroku container:login`
  - `heroku logs --tail -a <name-app>`

  Стоит обратить внимание что Heroku при развертывании использует свой порт
  достаем его через `process.env.PORT`

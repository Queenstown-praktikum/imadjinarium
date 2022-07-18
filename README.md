## Игра "Имаджинариум"

Клонирование проекта SSH:
```bash
git clone git@github.com:Queenstown-praktikum/imadjinarium.git
```

1) `npm i` - инициализация проекта
2) `npm run start:dev` - запускает режим разработки webpack-dev-server PORT=3000
3) `npm run start:build` - сборка проекта webpack -> dist
4) `npm run lint` - проверка eslint
5) `npm run lint:fix` - исправление eslint
6) `npm run stylelint` - проверка stylelint
7) `npm run stylelint:fix` - исправление stylelint
7) `npm run format` - запускает prettier

В проекте подключена `husky`, на `pre-commit` запускает `lint-staged`:

```json
  "lint-staged": {
    "src/**/*.(js|jsx|ts|tsx)": "eslint --fix",
    "src/**/*.(css|sass|scss)": "stylelint --fix"
  }
```

### Принятые договоренности
1) Умные компоненты храним в папке `Features`
2) Components, Feature, Pages ... экспортируем из осмысленно наименованных файлов, не из `index.tsx`
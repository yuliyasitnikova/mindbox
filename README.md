## Исправление ошибки "Модальное окно не открывается при нажатии на кнопку открытия".

При клике на кнопку "Open invites list" в компоненте `Root`, вызывается метод `toggle` этого компонента. В нем мы пытаемся изменить стейт, обращаясь к свойству `opened` объекта `this.state`: `(this.state as any).opened`. Вместо этого мы должны воспользоваться методом `this.setState` и в колбеке вернуть новое значение свойства:

```jsx
this.setState(() => ({
  opened: opened,
}));
```

Или просто:

```jsx
this.setState(() => ({ 
  opened
}));
```

## Исправление ошибки "При добавлении инвайта, поле ввода инвайта должно очищаться".

В компоненте `Invites` у нас есть форма с полем и кнопкой. Изменение поля меняет значение `name` внутреннего стейта, а нажатие на кнопку передает `name` наружу (в компонент `Root`). В компоненте `Root` это значение "пушится" в массив `invites` и новое значение этого массива передается в компонент `Invites` - для отрисовки списка.

В компоненте `Invites` есть `useEffect`, который очищает значение `name`. В качестве реактивной зависимости передан массив `invites`. Однако, когда `invites` меняется, `useEffect` не срабатывает. Я полагаю, что это связано с тем, что старое и новое значение `invites` являются ссылками на одно и то же значение, так как это массив. Под капотом у `useEffect` используется `Object.is`, который сравнивает значения. `Object.is(invites, invites)` возвращает `true` - значения равны. А значит, вызов `useEffect` не нужен.

Это можно обойти, если мы передадим в качестве зависимости длину массива:

```jsx
useEffect(() => {
  setName("");
}, [invites.length]);
```

Но можно избавиться от `useEffect` и очищать значение `name` после вызова функции `onAdd` в `handleSubmit`:

```jsx
const handleSubmit = useCallback(() => {
  onAdd(name);
  setName("");
}, [name, setName, onAdd]);
```

## Другие улучшения

1. Кнопке "Open invites list" добавила атрибут `type` со значением `button`. Если эта кнопка когда-нибудь окажется внутри формы, клик по ней не будет отправлять эту форму.

2. Компонент `Close` используется для закрытия модального окна, но в качестве кнопки использован тег `div`. У него не указан атрибут `tabindex` и мы не можем сфокусироваться на кнопке с помощью `Tab`, если захотим. Я поменяла `div` на `button`, указала тип и добавила `aria-label`, чтобы сделать интерфейс более доступным. Иконке при этом добавила атрибут `aria-hidden`. Теперь можно фокусироваться на кнопке и закрывать модальное окно нажатием на `Enter` и пробел. Я оформила состояние `focus-visible`, чтобы подсказать пользователю, когда кнопка в фокусе.

3. В компоненте `Invites` `div` с классом `invites--form` заменила на `form`, а обработчик отправки убрала с кнопки на эту форму. Чтобы страница не перезагружалась после отправки, в `handleSubmit` отменила действие по умолчанию. Этот вариант семантичнее, и теперь мы можем пользоваться кнопкой `Enter` после ввода имени для отправки формы, а не кликать для этого по кнопке.

4. Убрала `any` для типизации `event` в `handleChangeName`.

5. Добавила `key` для `<li>`. Так как мы не генерируем уникальные id, а используем только `name`, чтобы избежать ошибки в случае ввода двух одинаковых `name`, в формировании `key` я использовала `index`. 
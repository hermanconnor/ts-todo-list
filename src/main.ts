import './css/normalize.css';
import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const form = document.getElementById('form') as HTMLFormElement;
  const clearItems = document.getElementById(
    'clearItemsBtn',
  ) as HTMLButtonElement;

  form.addEventListener('submit', (e: SubmitEvent): void => {
    e.preventDefault();

    const input = document.getElementById('newItem') as HTMLInputElement;

    const newEntryText: string = input.value.trim();
    if (!newEntryText) return;

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemId.toString(), newEntryText);

    fullList.addItem(newItem);

    template.render(fullList);

    input.value = '';
  });

  clearItems.addEventListener('click', (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener('DOMContentLoaded', initApp);
